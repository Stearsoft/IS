<template>
  <div class="settingContainer" :class="{
    [settingUIclass]:true,
    minimal_mode: is_data.theme.minimal_mode
  }">
    <div
      class=" xl-absolute xl-right-2 xl-top-2 xl-size-6 xl-group hover:xl-bg-red-400 xl-transition-all xl-rounded-full"
      @click="closeSetting">
      <IconClose class="group-hover:xl-fill-white xl-transition-all" />
    </div>
    <el-container>
      <el-aside class="aside">
        <ul class="type_list" :class="{
          minimal_mode: is_data.theme.minimal_mode
        }">
          <li v-for="(item, index) in types_list" :key="index" :class="{ active: index === types_active_index }"
            @click="types_active_index = index">
            <SettingIcon :icon="item.iconName" />
            <span class="text_color" @click.stop="types_active_index = index">{{ item.label }}</span>
          </li>
        </ul>
      </el-aside>
      <el-main class="main" :class="{
        minimal_mode: is_data.theme.minimal_mode
      }">
        <div v-for="(item, index) in types_list" :class="{ active: index === types_active_index }" :key="index"
          class="type_content">
          <template v-if="item.contents.group">
            <el-header class="group">
              <span class="text_color" v-for="(ii, i) in item.contents.pages" :key="i"
                :class="{ 
                  active: i === item.contents.default_page,
                  'xl-opacity-30': ii.minimal_mode_hide && is_data.theme.minimal_mode,
                  'xl-pointer-events-none': ii.minimal_mode_hide && is_data.theme.minimal_mode,
                  'xl-cursor-none': ii.minimal_mode_hide && is_data.theme.minimal_mode,
                }" @click.stop="item.contents.default_page = i">{{
                  ii.label }}</span>
            </el-header>
            <el-main class="pages">
              <div class="page" v-for="(ii, i) in item.contents.pages" :key="i"
                :class="{ active: i === item.contents.default_page }">
                <dl v-for="(ji, j) in ii.items" :key="j" :class="{
                  disabled: !ji.condition(),
                  card: ji.type === 'card',
                  full: ji.card_mode == 'full',
                  slider: ji.type === 'slider',
                  minimal_mode: is_data.theme.minimal_mode,
                  'xl-opacity-30': ji.minimal_mode_hide && is_data.theme.minimal_mode,
                  'xl-pointer-events-none': ji.minimal_mode_hide && is_data.theme.minimal_mode,
                  'xl-cursor-none': ji.minimal_mode_hide && is_data.theme.minimal_mode,
                }">
                  <template v-if="ji.type === 'card'">
                    <SettingCard :card="ji.card_name" :mode="ji.card_mode" :title="ji.text" />
                  </template>
                  <template v-else>
                    <dt>
                      <span class="title">{{ ji.label }}</span>
                      <span class="description">{{ ji.description }}</span>
                    </dt>
                    <dd>
                      <template v-if="ji.type === 'switch'">
                        <el-switch size="large" v-model="ji.default" @change="ji.action(ji.default)" />
                      </template>
                      <template v-else-if="ji.type === 'button'">
                        <button class="xn-btn primary" @click="ji.action">{{ ji.text }}</button>
                      </template>
                      <template v-else-if="ji.type === 'slider'">
                        <el-slider v-model="ji.default" :min="ji.min" :max="ji.max" :format-tooltip="ji.format_tooltip"
                          @change="ji.done(ji.default)" @input="ji.input(ji.default)"></el-slider>
                      </template>
                      <template v-else-if="ji.type === 'select'">
                        <el-select v-model="ji.value" :placeholder="ji.placeholder" style="width: 150px"
                          @change="ji.action">
                          <el-option v-for="item in ji.options" :key="item.value" :label="item.label"
                            :value="item.value" />
                        </el-select>
                      </template>
                    </dd>
                  </template>
                </dl>
              </div>
            </el-main>
          </template>
          <template v-else>
            <main class="item_main">
              <dl v-for="(ji, j) in item.contents.page" :key="j" :class="{
                disabled: !ji.condition(),
                card: ji.type === 'card',
                full: ji.card_mode == 'full',
                minimal_mode: is_data.theme.minimal_mode
              }">
                <template v-if="ji.type === 'card'">
                  <SettingCard :card="ji.card_name" :mode="ji.card_mode" :title="ji.text" />
                </template>
                <template v-else>
                  <dt>
                    <span class="title">{{ ji.label }}</span>
                    <span class="description">{{ ji.description }}</span>
                  </dt>
                  <dd>
                    <template v-if="ji.type === 'switch'">
                      <el-switch size="large" v-model="ji.default" @change="ji.action(ji.default)" />
                    </template>
                    <template v-else-if="ji.type === 'button'">
                      <button class="xn-btn primary" @click="ji.action">{{ ji.text }}</button>
                    </template>
                    <template v-else-if="ji.type === 'slider'">
                      <el-slider v-model="ji.default" :min="ji.min" :max="ji.max" :format-tooltip="ji.format_tooltip"
                        @change="ji.done(ji.default)" @input="ji.input(ji.default)"></el-slider>
                    </template>
                    <template v-else-if="ji.type === 'select'">
                      <el-select v-model="ji.value" :placeholder="ji.placeholder" style="width: 150px"
                        @change="ji.action">
                        <el-option v-for="item in ji.options" :key="item.value" :label="item.label"
                          :value="item.value" />
                      </el-select>
                    </template>
                  </dd>
                </template>
              </dl>
            </main>
          </template>
        </div>
      </el-main>
    </el-container>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import SettingCard from './setting_components/SettingCard.vue';
import { useStore } from 'vuex';
import { is } from '@/utils/is';
import SettingIcon from './setting_components/SettingIcon.vue';
import IconClose from '../icons/IconClose.vue';
const settingUIclass = ref('');
const emit = defineEmits(['close']);
const closeSetting = () => {
  settingUIclass.value = 'hide';
  setTimeout(() => {
    emit('close', "setting");
  }, 50);
}
const { t } = useI18n();
const is_data = is().is_current.value;
const store = useStore();
const types_list_default = [
  {
    label: t('setting.theme'),
    iconName: 'theme',
    contents: {
      group: true,
      default_page: 0,
      pages: [
        {
          label: t('setting.baseTheme'),
          icon: 'fas fa-palette',
          items: [
            {
              label: t('setting.darkMode'),
              description: t('setting.darkModeDescription'),
              type: 'switch',
              default: !is_data.theme.lightMode,
              condition: function () {
                return true;
              },
              action: function (value) {
                is_data.theme.lightMode = !value;
              }
            }, {
              label: t('setting.dynamic'),
              description: t('setting.dynamicDescription'),
              type: 'switch',
              default: is_data.theme.dynamic,
              condition: function () {
                return true;
              },
              action: function (value) {
                is_data.theme.dynamic = value;
              }
            }, {
              label: t('setting.minimalMode'),
              description: t('setting.minimalModeDescription'),
              type: 'switch',
              default: is_data.theme.minimal_mode,
              condition: function () {
                return true;
              },
              action: function (value) {
                is_data.theme.minimal_mode = value;
              }
            }, {
              label: t('setting.maskOpacity'),
              description: t('setting.maskOpacityDescription'),
              type: 'slider',
              default: is_data.theme.background.mark_opacity * 100,
              max: 100,
              min: 0,
              minimal_mode_hide: true,
              format_tooltip: function (value) {
                return value + '%';
              },
              condition: function () {
                return true;
              },
              input: function (value) {
                is_data.theme.background.mark_opacity = value / 100;
              },
              done: function (value) {
                is_data.theme.background.mark_opacity = value / 100;
              }
            }, {
              label: t('setting.background_blur'),
              description: t('setting.background_blur_description'),
              type: 'slider',
              default: is_data.theme.background.blur,
              max: 100,
              min: 0,
              minimal_mode_hide: true,
              format_tooltip: function (value) {
                return value + 'px';
              },
              condition: function () {
                return true;
              },
              input: function (value) {
                is_data.theme.background.blur = value;
              },
              done: function (value) {
                is_data.theme.background.blur = value;
              }
            }
          ]
        }, {
          label: t('setting.colorPage'),
          icon: 'fas fa-palette',
          items: [
            {
              text: t('setting.colorPage_text.color_custom'),
              type: 'card',
              card_name: 'color_custom',
              card_mode: 'default',
              condition: function () {
                return true;
              }
            }, {

              text: t('setting.colorPage_text.color_default'),
              type: 'card',
              card_name: 'color_default',
              card_mode: 'default',
              condition: function () {
                return true;
              }
            }
          ]
        }, {
          label: t('setting.staticWallpaper'),
          icon: 'fas fa-palette',
          minimal_mode_hide: true,
          items: [
            {
              condition: function () {
                return true;
              },
              label: t('setting.staticWallpaper_text.time'),
              description: t('setting.staticWallpaper_text.time_description'),
              type: 'button',
              text: t('action.click'),
              action: function () {
                is_data.theme.background.type = "time";
                is_data.theme.background.value = "is://type:time";
                store.dispatch('background', {
                  type: "time",
                  value: 'is://type:time',
                  base64: ''
                });
              }
            }, {
              text: t('setting.staticWallpaper_text.upload'),
              type: 'card',
              card_name: 'staticWallpaper_upload',
              card_mode: 'default',
              condition: function () {
                return true;
              }
            }, {
              text: t('setting.staticWallpaper_text.link'),
              type: 'card',
              card_name: 'staticWallpaper_link',
              card_mode: 'default',
              condition: function () {
                return true;
              }
            }, {
              text: t('setting.staticWallpaper_text.color'),
              type: 'card',
              card_name: 'staticWallpaper_color',
              card_mode: 'default',
              condition: function () {
                return true;
              }
            }, {
              text: t('setting.staticWallpaper_text.imgs'),
              type: 'card',
              card_name: 'staticWallpaper_imgs',
              card_mode: 'default',
              condition: function () {
                return true;
              }
            }, {
              text: t('setting.staticWallpaper_text.random'),
              type: 'card',
              card_name: 'staticWallpaper_random',
              card_mode: 'default',
              condition: function () {
                return true;
              }
            }
          ]
        }, {
          label: t('setting.dynamicWallpaper'),
          icon: 'fas fa-palette',
          minimal_mode_hide: true,
          items: [
            {
              type: 'card',
              text: t('setting.dynamicWallpaper_text.link'),
              card_name: "dynamicWallpaper_link",
              card_mode: 'default',
              condition: function () {
                return true;
              }
            }, {
              type: 'card',
              text: t('setting.dynamicWallpaper_text.upload'),
              card_name: "dynamicWallpaper_upload",
              card_mode: 'default',
              condition: function () {
                return true;
              }
            },
          ]
        }, {
          label: 'Wallhaven',
          icon: 'fas fa-palette',
          minimal_mode_hide: true,
          items: [
            {
              type: 'card',
              text: 'Wallhaven',
              card_name: "Wallhaven",
              card_mode: 'full',
              condition: function () {
                return true;
              }
            }
          ]
        }
      ]
    }
  }, {
    label: '搜索设置',
    iconName: 'search',
    contents: {
      group: false,
      page: [
        {
          label: t('setting.autoCleanInput'),
          description: t('setting.autoCleanInputDescription'),
          type: 'switch',
          default: is_data.search.auto_clear,
          condition: function () {
            return true;
          },
          action: function (value) {
            is_data.search.auto_clear = value;
          }
        }, {
          label: t('setting.disableAutoGo'),
          description: t('setting.disableAutoGoDescription'),
          type: 'switch',
          default: is_data.search.disable_auto_redirect,
          condition: function () {
            return true;
          },
          action: function (value) {
            is_data.search.disable_auto_redirect = value;
          }
        }, {
          label: t('setting.autoFocus'),
          description: t('setting.autoFocusDescription'),
          type: 'switch',
          default: is_data.search.auto_focus,
          condition: function () {
            return true;
          },
          action: function (value) {
            is_data.search.auto_focus = value;
          }
        }, {
          type: 'card',
          text: t('setting.searchEngineList'),
          card_name: "search_engine",
          card_mode: 'noPadding',
          condition: function () {
            return true;
          }
        },
      ]
    }
  }, {
    label: '更多功能',
    iconName: 'more',
    contents: {
      group: false,
      page: [
        {
          label: t('setting.autoHideBookmark'),
          description: t('setting.autoHideBookmarkDescription'),
          type: 'switch',
          default: true,
          condition: function () {
            return true;
          },
          action: function (value) {
            console.log(value);
          }
        }, {
          label: t('setting.weather'),
          description: t('setting.weatherDescription'),
          type: 'switch',
          default: false,
          condition: function () {
            return true;
          },
          action: function (value) {
            console.log(value);
          }
        }, {
          label: t('setting.aword'),
          description: t('setting.awordDescription'),
          type: 'switch',
          default: false,
          condition: function () {
            return true;
          },
          action: function (value) {
            console.log(value);
          }
        }, {
          label: t('setting.timeStyle'),
          description: t('setting.timeStyleDescription'),
          type: 'select',
          value: "10:30",
          placeholder: t("setting.setting"),
          options: [
            {
              value: 'HHHH:MiMi',
              label: '10:30'
            }, {
              value: 'HHHH:MiMi:SSSS',
              label: "10:30:00"
            }, {
              value: 'YYYY' + t('date.year') + 'MoMo' + t('date.month') + 'DDDD' + t('date.day'),
              label: '2025' + t('date.year') + '10' + t('date.month') + '1' + t('date.day')
            }, {
              value: 'YYYY' + t('date.year') + 'MoMo' + t('date.month') + 'DDDD' + t('date.day') + ' HHHH:MiMi',
              label: '2025' + t('date.year') + '10' + t('date.month') + '1' + t('date.day') + ' 10:30'
            }, {
              value: ' ',
              label: t("setting.emptyValue")
            }, {
              value: '/logo_tif/',
              label: t('logo.tif')
            }, {
              value: '/logo_xn/',
              label: t('logo.xn')
            }
          ],
          default: false,
          condition: function () {
            return true;
          },
          action: function (value) {
            const getTime = (format) => {
              const now = new Date();
              const year = now.getFullYear();
              const month = String(now.getMonth() + 1).padStart(2, '0');
              const day = String(now.getDate()).padStart(2, '0');
              const hour = String(now.getHours()).padStart(2, '0');
              const minute = String(now.getMinutes()).padStart(2, '0');
              const second = String(now.getSeconds()).padStart(2, '0');
              return format.replace('YYYY', year)
                .replace('MoMo', month)
                .replace('DDDD', day)
                .replace('HHHH', hour)
                .replace('MiMi', minute)
                .replace('SSSS', second);
            }
            is_data.time.form = value;
            is_data.time.base = getTime(value);
          }
        }, {
          label: t('setting.airCopy'),
          description: t('setting.airCopyDescription'),
          type: 'switch',
          default: true,
          condition: function () {
            return false;
          },
          action: function (value) {
            console.log(value);
          }
        }
      ]
    }
  }, {
    label: '林中木',
    iconName: 'search',
    contents: {
      group: false,
      default_page: 0,
      page: [

      ]
    }
  }
]
const types_list = ref(types_list_default);
const types_active_index = ref(0);
</script>

<style scoped lang="less">
.settingContainer {
  position: absolute;
  height: 55%;
  top: 15%;
  left: 0;
  right: 0;
  box-shadow: 0 0 20px #00000042;
  border-radius: 7px;
  max-width: 800px;
  min-width: 200px;
  width: 100%;
  margin: auto;
  transition: all 0.3s;
  overflow: hidden;
  display: flex;
  backdrop-filter: blur(10px);
  z-index: 1000;
  animation: fadeInScale 0.3s;
  max-height: 600px;
  min-height: 450px;

  &.minimal_mode {
    box-shadow: none;
    border: 1px solid #6262621f;
  }

  &.hide {
    opacity: 0;
    transform: scale(0.8);
  }

  .aside {
    width: 24%;

    .type_list {
      padding-top: 50px;

      background: var(--bg-3);
      height: 100%;
      padding-top: 50px;

      &.minimal_mode {
        border-right: 1px solid #6262621f;

        li {
          margin: 0 6px;
          border-radius: 8px;
          padding: 8px 15px;

          &.active {
            background-color: var(--theme-color_c);
          }
        }
      }

      li {
        padding: 10px 15px;
        font-size: 15px;
        display: flex;
        align-items: center;
        transition: all 0.3s;

        i {
          width: 20px;
          color: var(--theme-color, #0084ff);
          margin: 5px 12px;
          font-size: 20px;
        }

        &.active {
          background: var(--bg-9);
        }
      }
    }
  }

  .main {
    width: 76%;
    background: var(--bg-4);
    display: flex;
    flex-direction: column;
    --el-main-padding: 0;

    &.minimal_mode{
      background: var(--bg-1);
    }

    .type_content {
      display: none;

      .group {
        display: flex;
        align-items: flex-end;
        --el-header-height: 80px;

        span {
          // background: #00000017;
          padding: 10px;
          margin-right: 8px;
          border-radius: 5px;
          white-space: nowrap;
          transition: all 0.3s;
          align-items: center;
          display: flex;
          position: relative;
          height: 40px;

          &.active {
            color: var(--theme-color, #0084ff);
            background: var(--theme-color_c, #0084ff10);
            &::after{
              opacity: 0.2;
            }
          }

          &:hover {
            color: var(--theme-color, #0084ff);

            &::after{
              opacity: 0.2;
            }
          }

          &::after {
            content: '';
            --w: 40px;
            height: var(--w);
            width: var(--w);
            position: absolute;
            background: var(--theme-color);
            top: 2px;
            left: 50%;
            z-index: 1;
            border-radius: var(--w);
            transform: translateX(-50%);
            filter: blur(8px);
            opacity: 0;
            transition: all .3s;
          }
        }
      }

      .pages {
        .page {
          display: none;

          &.active {
            display: block;
          }
        }
      }
    }

    .type_content.active {
      display: block;
    }

    .item_main {
      padding: 40px 20px;
    }

    dl {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 7px;

      dt {
        display: flex;
        flex-direction: column;

        span.title {
          font-size: 17px;
          color: var(--font-1);
        }

        span.description {
          opacity: .6;
          margin-top: 4px;
          font-size: 13px;
          color: var(--font-1);
        }
      }

      &.card:not(.full) {
        padding: 10px;
        background: var(--bg-9);
        border-radius: 5px;
        margin-bottom: 10px;
        -webkit-box-shadow: 0 0 7px #00000029;
        box-shadow: 0 0 7px #00000029;
      }

      &.card.minimal_mode:not(.full) {
        border: 2px solid var(--border-3);
        box-shadow: 0 0 10px var(--shadow-2);
      }

      &.full {
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 10px;
      }

      &.disabled {
        opacity: .4;
        pointer-events: none;
      }

      &.slider {
        flex-direction: column;

        &>dd {
          max-width: 100%;
          margin-top: 10px;
          background: var(--bg-5);
          border-radius: 3px;
          padding: 10px;
        }
      }
    }

    dd {
      width: 100%;
      text-align: right;
      max-width: 180px;
    }
  }

  main.pages,
  main.item_main,
  div.page {
    -webkit-animation: fadeInUp 0.5s ease-in-out;
    animation: fadeInUp 0.5s ease-in-out;
  }

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateX(10px);
    }

    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
}

.xn-btn {
  padding: 7px 19px;
  border-radius: 5px;
  background: var(--btn-bg, #00000012);
  color: var(--btn-color, #363636);
  font-size: 12px;
  transition: all 0.3s;

  &:hover {
    color: white;
    background: var(--btn-color, #363636);
  }
}

.xn-btn.primary {
  --btn-bg: var(--theme-color_c, #0084ff12);
  --btn-color: var(--theme-color, #0084ff);
  background: var(--btn-bg, #0084ff12);
  color: var(--btn-color, #0084ff);
  font-size: 12px;

  &:hover {
    color: white;
    --btn-bg: var(--theme-color, #0084ff);
    background: var(--btn-color, #0084ff);
  }
}

@-webkit-keyframes fadeInScale {
  0% {
    opacity: 0;
    -webkit-transform: scale(0.8);
    transform: scale(0.8);
  }

  100% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes fadeInScale {
  0% {
    opacity: 0;
    -webkit-transform: scale(0.8);
    transform: scale(0.8);
  }

  100% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

;
</style>