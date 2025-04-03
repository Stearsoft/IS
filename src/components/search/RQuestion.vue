<template>
    <div class="accordion__item" :class="{ 'accordion-open': isOpen }">
        <div class="accordion__header" @click="toggleItem">
            <IconPlus :class="isOpen ? 'bx bx-minus accordion__icon' : 'bx bx-plus accordion__icon'" class=" xl-size-4">
            </IconPlus>
            <h3 class="accordion__title">{{ question.question }}</h3>
        </div>

        <div class="accordion__content" ref="contentRef" :style="{ height: isOpen ? contentHeight : '0px' }">
            <div class="accordion__description">
                <span v-for="(item, index) in question.answers" :key="index">
                    <template v-if="item.type == 'answer'">
                        {{ item.value.text }}
                    </template>
                    <template v-else-if="item.type == 'table'">
                        <table>
                            <tr v-for="(tr, lineIndex) in item.items" :key="lineIndex" :class="{
                                'table_header': lineIndex == 0,
                            }">
                                <template v-if="lineIndex == 0">
                                    <th v-for="(th, thIndex) in tr" :key="thIndex">
                                        {{ th.text }}
                                    </th>
                                </template>
                                <template v-else>
                                    <td v-for="(td, tdIndex) in tr" :key="tdIndex">
                                        {{ td.text }}
                                    </td>
                                </template>
                            </tr>
                        </table>
                    </template>
                </span>

                <a :href="question.answer_link" target="_blank" rel="noopener noreferrer">
                    <div v-show="question.answer_display_link" class="xl-flex xl-mt-4">
                    <div class="xl-flex xl-items-center xl-mr-5">
                        <img :src="question.site_name ? question.site_icon : 'https://tfseek.top/api/favicon/get.php?url=' + question.link"
                            :alt="capitalizeHostName(link)" class=" xl-size-7 xl-rounded-full" :style="{
                                'background-color': question.site_name ? question.site_icon_backgroundcolor : '',
                            }">
                    </div>
                    <div>
                        <div class="display_box">
                            <h4>{{ question.answer_source }}</h4>
                            <p>{{ question.display_link }}</p>
                        </div>
                        <span>{{ link }}</span>
                    </div>
                </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref, nextTick } from 'vue';
import IconPlus from '../icons/IconPlus.vue';
const props = defineProps({
    question: {
        type: Object,
        required: true
    }
});

const link = props.question.answer_display_link.slice(0, props.question.answer_display_link.length / 2);
const isOpen = ref(false);
const contentRef = ref(null);
const contentHeight = ref('0px');

const toggleItem = async () => {
    isOpen.value = !isOpen.value;

    if (isOpen.value) {
        await nextTick();
        contentHeight.value = contentRef.value.scrollHeight + 'px';
    } else {
        contentHeight.value = '0px';
    }
};
const capitalizeHostName = (url) => {
    try {
        const parsedUrl = new URL(url);
        const hostname = parsedUrl.hostname.replace(/^www\./, '');
        const parts = hostname.split('.');

        if (parts.length > 1) {
            parts[0] = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
        }

        return parts.join('.');
    } catch (error) {
        console.error('Invalid URL:', url);
        return '';
    }
};

</script>

<style scoped lang="less">
.accordion__item {
    box-shadow: 0 2px 6px rgba(38, 38, 38, 0.1);
    border-radius: .25rem;
    position: relative;
    transition: all .25s ease;
    background-color: var(--bg-9);
    backdrop-filter: blur(10px);
    margin-bottom: 10px;
    color: var(--font-1);

    &:hover {
        background-color: var(--bg-7);
    }

    &::after {
        content: '';
        background-color: var(--theme-color);
        width: 5px;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: .25rem 0 0 .25rem;
    }

    .accordion__header {
        display: flex;
        column-gap: .5rem;
        padding: 1.25rem 1.25rem 1.25rem 1rem;
        cursor: pointer;
        align-items: center;


        .accordion__icon {
            height: max-content;
            fill: var(--font-1);
            transition: .3s;
            margin-right: 10px;
        }


        .accordion__title {
            font-size: var(--small-font-size);
            color: var(--title-color);
            font-weight: 400;
            margin-top: .15rem;
            transition: .2s;
        }
    }


    .accordion__content {
        overflow: hidden;
        height: 0;
        transition: all .25s ease;


        .accordion__description {
            padding: 0 1.25rem 1.25rem 3rem;
            font-size: var(--smaller-font-size);


            table {
                width: calc(100% - 20px);

                tr {
                    height: 34px;
                    border-radius: 3px;
                    margin-bottom: 2px;
                    transition: all .3s;

                    &.table_header {
                        border-bottom: 1px solid;
                        color: var(--theme-color);
                    }
                    &:not(.table_header):hover {
                        background-color: var(--bg-7);
                    }
                    td {
                        text-align: center;
                    }
                }
            }

            .display_box {
                h4 {
                    font-size: 16px;
                    color: var(--theme-color);
                }

                span {
                    font-size: 14px;
                }
            }
        }
    }
}

.accordion-open .accordion__icon {
    transform: rotate(45deg);
}

.accordion-open .accordion__title {
    font-weight: 600;
}
</style>