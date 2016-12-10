import {
  BUILD_RELEASE,
  BUILD_STABLE,
  BUILD_NIGHTLY,
  NATIVE_MAC,
  NATIVE_WIN,
  NATIVE_LINUX,
  NATIVE_ALL,
  MODE_ZIP,
  MODE_MAVEN,
  MODE_GRADLE,
} from './constants'

const config = {

  lwjgl: {},
  builds: {
    byId: {
      [BUILD_RELEASE]: {
        id: BUILD_RELEASE,
        title: 'Release',
        description: 'Latest official release',
      },
      [BUILD_STABLE]: {
        id: BUILD_STABLE,
        title: 'Stable',
        description: 'Beta quality, verified to work',
      },
      [BUILD_NIGHTLY]: {
        id: BUILD_NIGHTLY,
        title: 'Nightly',
        description: 'Bleeding edge, possibly broken',
      },
    },
    allIds: [BUILD_RELEASE, BUILD_STABLE, BUILD_NIGHTLY],
  },
  versions: {
    byId: {
      '3.1.0': {
        id: '3.1.0',
        semver: [3, 1, 0]
      },
      '3.0.0': {
        id: '3.0.0',
        semver: [3, 0, 0]
      }
    },
  },
  modes: {
    byId: {
      [MODE_ZIP]: {
        id: MODE_ZIP,
        title: 'ZIP Bundle',
      },
      [MODE_MAVEN]: {
        id: MODE_MAVEN,
        title: 'Maven',
      },
      [MODE_GRADLE]: {
        id: MODE_GRADLE,
        title: 'Gradle',
      },
    },
  },
  natives: {
    byId: {
      [NATIVE_WIN]: {
        id: NATIVE_WIN,
        title: 'Windows',
      },
      [NATIVE_MAC]: {
        id: NATIVE_MAC,
        title: 'macOS',
      },
      [NATIVE_LINUX]: {
        id: NATIVE_LINUX,
        title: 'Linux',
      },
    },
    allIds: NATIVE_ALL
  },
  languages: {
    byId: {
      'groovy': {
        id: 'groovy',
        title: 'Groovy',
      },
      'kotlin': {
        id: 'kotlin',
        title: 'Kotlin',
      }
    }
  },
  presets: {
    byId: {
      'none': {
        id: 'none',
        title: 'None',
        artifacts: [
          'lwjgl'
        ]
      },
      'custom': {
        id: 'custom',
        title: 'Custom',
      },
      'all': {
        id: 'all',
        title: 'Everything',
      },
      'getting-started': {
        id: 'getting-started',
        title: 'Getting Started',
        artifacts: [
          'lwjgl',
          'lwjgl-glfw',
          'lwjgl-jemalloc',
          'lwjgl-nanovg',
          'lwjgl-nfd',
          'lwjgl-nuklear',
          'lwjgl-openal',
          'lwjgl-opengl',
          'lwjgl-par',
          'lwjgl-stb',
          'lwjgl-tinyfd',
          'lwjgl-vulkan',
        ]
      },
      'minimal-opengl': {
        id: 'minimal-opengl',
        title: 'Minimal OpenGL',
        artifacts: [
          'lwjgl',
          'lwjgl-glfw',
          'lwjgl-jemalloc',
          'lwjgl-openal',
          'lwjgl-opengl',
          'lwjgl-stb',
        ]
      },
      'minimal-opengles': {
        id: 'minimal-opengles',
        title: 'Minimal OpenGL ES',
        artifacts: [
          'lwjgl',
          'lwjgl-egl',
          'lwjgl-glfw',
          'lwjgl-jemalloc',
          'lwjgl-openal',
          'lwjgl-opengles',
          'lwjgl-stb',
        ]
      },
      'minimal-vulkan': {
        id: '',
        title: 'Minimal Vulkan',
        artifacts: [
          'lwjgl',
          'lwjgl-glfw',
          'lwjgl-jemalloc',
          'lwjgl-openal',
          'lwjgl-stb',
          'lwjgl-vulkan',
        ]
      },
    },
  },
  addons: {
    byId: {
      'joml': {
        id: 'joml',
        title: 'JOML',
        description: 'A Java math library for OpenGL rendering calculations.',
        about: 'http://joml-ci.github.io/JOML/',
        maven: {
          groupId: 'org.joml',
          artifactId: 'joml',
          version: '1.9.0',
        },
      },
      'steamworks4j': {
        id: 'steamworks4j',
        title: 'steamworks4j',
        description: 'A library that allows Java applications to access the Steamworks C++ API.',
        about: 'http://code-disaster.github.io/steamworks4j/',
        maven: {
          groupId: 'com.code-disaster.steamworks4j',
          artifactId: 'steamworks4j',
          version: '1.5.0',
        },
      }
    },
    allIds: [
      'joml',
      'steamworks4j',
    ]
  },

  // UI State

  build: null,
  mode: MODE_ZIP,
  preset: 'all',
  descriptions: false,
  compact: false,
  hardcoded: false,
  javadoc: true,
  source: true,
  language: null,
  platform: {},
  version: null,
  downloading: false,
  progress: [],
  contents: {},
  availability: {},
  selectedAddons: [],
};

function getDefaultPlatform() {
  if ( navigator.platform.indexOf('Mac') > -1 || navigator.platform.indexOf('iP') > -1 ) {
    return 'macos';
  } else if ( navigator.platform.indexOf('Linux') > -1 ) {
    return 'linux';
  }

  return 'windows';
}

config.modes.allIds = Object.keys(config.modes.byId);
config.versions.allIds = Object.keys(config.versions.byId);
config.languages.allIds = Object.keys(config.languages.byId);
config.presets.allIds = Object.keys(config.presets.byId);

config.language = config.languages.allIds[0];
config.version = config.versions.allIds[0];

config.natives.allIds.forEach(platform => {
  config.platform[platform] = false;
});
config.platform[getDefaultPlatform()] = true;

import lwjgl_300 from './lwjgl/3.0.0'
import lwjgl_310 from './lwjgl/3.1.0'
import lwjgl_stable from './lwjgl/stable'
import lwjgl_nightly from './lwjgl/nightly'

config.lwjgl['3.0.0'] = lwjgl_300();
config.lwjgl['3.1.0'] = lwjgl_310(config.lwjgl['3.0.0']);
config.lwjgl['stable'] = lwjgl_stable(config.lwjgl['3.1.0']);
config.lwjgl['nightly'] = lwjgl_nightly(config.lwjgl['stable']);

export default config;