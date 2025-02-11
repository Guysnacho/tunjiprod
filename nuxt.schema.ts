import { field, group } from '@nuxt/content/preview'

export default defineNuxtSchema({
  appConfig: {
    ui: group({
      title: 'UI',
      description: 'UI Customization.',
      icon: 'pi pi-palette',
      fields: {
        icons: group({
          title: 'Icons',
          description: 'Manage icons used in UI Pro.',
          icon: 'pi pi-cog',
          fields: {
            search: field({
              type: 'icon',
              title: 'Search Bar',
              description: 'Icon to display in the search bar.',
              icon: 'pi pi-search',
              default: 'pi pi-search'
            }),
            dark: field({
              type: 'icon',
              title: 'Dark mode',
              description: 'Icon of color mode button for dark mode.',
              icon: 'pi pi-moon',
              default: 'pi pi-moon'
            }),
            light: field({
              type: 'icon',
              title: 'Light mode',
              description: 'Icon of color mode button for light mode.',
              icon: 'pi pi-sun',
              default: 'pi pi-sun'
            }),
            external: field({
              type: 'icon',
              title: 'External Link',
              description: 'Icon for external link.',
              icon: 'pi pi-external-link',
              default: 'pi pi-external-link'
            }),
            chevron: field({
              type: 'icon',
              title: 'Chevron',
              description: 'Icon for chevron.',
              icon: 'pi pi-chevron-down',
              default: 'pi pi-chevron-down'
            }),
            hash: field({
              type: 'icon',
              title: 'Hash',
              description: 'Icon for hash anchors.',
              icon: 'pi pi-hashtag',
              default: 'pi pi-hashtag'
            })
          }
        }),
        primary: field({
          type: 'string',
          title: 'Primary',
          description: 'Primary color of your UI.',
          icon: 'pi pi-palette',
          default: 'green',
          required: ['sky', 'mint', 'rose', 'amber', 'violet', 'emerald', 'fuchsia', 'indigo', 'lime', 'orange', 'pink', 'purple', 'red', 'teal', 'yellow', 'green', 'blue', 'cyan', 'gray', 'white', 'black']
        }),
        gray: field({
          type: 'string',
          title: 'Gray',
          description: 'Gray color of your UI.',
          icon: 'pi pi-palette',
          default: 'slate',
          required: ['slate', 'cool', 'zinc', 'neutral', 'stone']
        })
      }
    }),
    seo: group({
      title: 'SEO',
      description: 'SEO configuration.',
      icon: 'pi pi-globe',
      fields: {
        siteName: field({
          type: 'string',
          title: 'Site Name',
          description: 'Name used in ogSiteName and used as second part of your page title.',
          icon: 'pi pi-globe',
          default: []
        })
      }
    }),
    header: group({
      title: 'Header',
      description: 'Header configuration.',
      icon: 'pi pi-bars',
      fields: {
        search: field({
          type: 'boolean',
          title: 'Search Bar',
          description: 'Hide or display the search bar.',
          icon: 'pi pi-search',
          default: true
        }),
        colorMode: field({
          type: 'boolean',
          title: 'Color Mode',
          description: 'Hide or display the color mode button in your header.',
          icon: 'pi pi-moon',
          default: true
        })
      }
    }),
    footer: group({
      title: 'Footer',
      description: 'Footer configuration.',
      icon: 'pi pi-window-minimize',
      fields: {
        credits: field({
          type: 'string',
          title: 'Footer credits section',
          description: 'Text to display as credits in the footer.',
          icon: 'pi pi-info-circle',
          default: ''
        })
      }
    }),
    toc: group({
      title: 'Table of Contents',
      description: 'TOC configuration.',
      icon: 'pi pi-list',
      fields: {
        title: field({
          type: 'string',
          title: 'Title',
          description: 'Text to display as title of the main TOC.',
          icon: 'pi pi-book',
          default: ''
        })
      }
    })
  }
})
