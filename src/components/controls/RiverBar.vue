<template>
    <div class="bar">
        <div></div>
        <div class="xl-flex">
            <div class=" xl-grid group_collection xl-flex-grow xl-p-1 xl-w-full xl-h-300px xl-m-auto"
                ref="collection_list">
                <div v-for="item in list" :key="item.id" class=" xl-text-center xl-p-4 xl-rounded"
                    @mousedown="handleMouseDown(item)" @touchstart="handleMouseDown(item)" @click="handleClick(item)">
                    <div class=" xl-flex xl-flex-col xl-items-center" data-id="1726497211" :title="item.name">
                        <a href="https://tfseek.top" :aria-label="item.name" target="_blank" menu="collection"></a>
                        <div class=" xl-size-[50px] xl-backdrop-blur xl-rounded-full tile_icon xl-flex xl-items-center xl-justify-center"
                            draggable="false">
                            <img :alt="item.name" class="xl-size-[30px]"
                                src="https://tfseek.top/api/favicon/get.php?url=https://tfseek.top">
                        </div>
                        <div class=" xl-text-gray-50 xl-mt-1" draggable="false">
                            <span>{{ item.id }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useDraggable } from 'vue-draggable-plus'
import { ref } from 'vue';

const list = ref([
    {
        name: 'Joao',
        id: 1
    },
    {
        name: 'Jean',
        id: 2
    },
    {
        name: 'Johanna',
        id: 3
    },
    {
        name: 'Juan',
        id: 4
    }, {
        name: 'test',
        id: 5
    }, {
        name: 'test',
        id: 6
    }, {
        name: 'test',
        id: 7
    }, {
        name: 'test',
        id: 8
    }, {
        name: 'test',
        id: 9
    }, {
        name: 'test',
        id: 10
    }, {
        name: 'test',
        id: 11
    }, {
        name: 'test',
        id: 12
    }, {
        name: 'test',
        id: 13
    }, {
        name: 'test',
        id: 14
    }, {
        name: 'test',
        id: 15
    }, {
        name: 'test',
        id: 16
    }, {
        name: 'test',
        id: 17
    }, {
        name: 'test',
        id: 18
    }
])
const collection_list = ref()

// eslint-disable-next-line no-unused-vars
const { start } = useDraggable(collection_list, list, {
    animation: 150,
    ghostClass: 'ghost',
    onStart() {
        console.log('start');
    },
    onUpdate() {
        console.log('update');
    }
});

// 长按判断
let pressTimer = null;
let isLongPress = false;

const handleMouseDown = (item) => {
    isLongPress = false;
    pressTimer = setTimeout(() => {
        isLongPress = true;
        startDrag(item);
    }, 800); // 长按800ms
};

// eslint-disable-next-line no-unused-vars
const handleMouseUp = () => {
    clearTimeout(pressTimer);
    pressTimer = null;
};

const startDrag = (item) => {
    console.log('开始拖拽', item);
};

const handleClick = (item) => {
    if (!isLongPress) {
        console.log('点击', item);
    }
};
</script>

<style scoped lang="less">
.bar {
    z-index: 1000;
    width: calc(100% - 20px);
    padding: 10px;
    max-width: 600px;
    height: 60px;
    border-radius: 5px;
    position: absolute;
    bottom: 40px;
    left: 0;
    right: 0;
    margin: auto;
    transition: all .7s ease-in-out;

    &:hover {
        background-color: var(--bg-7);
        backdrop-filter: blur(10px);

        height: 300px;
    }


    .group_collection {
        grid-template-columns: repeat(auto-fill, minmax(98px, 5fr));
        grid-template-rows: auto;

        &>div {
            &.sortable-chosen {
                background-color: var(--bg-7);
                transition: background-color .3s;
            }

            div.tile_icon {
                background-color: var(--bg-7);
            }
        }
    }
}
</style>