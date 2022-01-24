import { gql } from '@apollo/client';

export const vesMenuConfig = gql`
{
    storeConfig {
      pwa {
        ves_menu_enable
        ves_menu_alias
      }
    }
  }
`;

export const popupInstallConfig = gql`
{
    storeConfig {
      pwa {        
        app_name
        icon_apple_touch
        custom_install_app_enable
        install_message
      }
    }
  }
`;

export const shareIconConfig = gql`
{
    storeConfig {
      pwa {
        share_icon_line
        share_icon_email
        share_icon_twitter
        share_icon_facebook
        share_icon_linkedin
        share_icon_telegram
      }
    }
  }
`;

export const getRemoveDecimalConfig = `
{
    storeConfig {
      pwa {        
        remove_decimal_price_enable
      }
    }
  }
`;

export const contactConfig = gql`
{
    storeConfig {
      pwa {
          cms_contact_identifiers
          recaptcha_contact_enable
      }
    }
}
`;

export const popupDetailImagePdp = gql`
{
  storeConfig {
    pwa {
      popup_detail_image_enable
      
    }
  }
}
`;

export const pageSizeConfig = gql`
{
  storeConfig {
    pwa {
      page_size
    }
  }
}`;

export const drawerFilterOnDesktopConfig = gql`
{
  storeConfig {
    pwa {
      drawer_filter_on_desktop_enable
    }
  }
}`;

export const labelConfig = gql`
{
  storeConfig {
    pwa {
      label_enable
    }
  }
}`;

export const configurableOptionsConfig = gql`
{
  storeConfig {
    pwa {
      configurable_options_enable
    }
  }
}`;

export const ratingConfig = gql`
{
  storeConfig {
    pwa {
      rating_enable
    }
  }
}`;

export const addToCartConfig = gql`
{
  storeConfig {
    pwa {
      add_to_cart_enable
    }
  }
}`;

export const quickViewConfig = gql`
    {
        storeConfig {
            pwa {
                quick_view_enable
            }
        }
    }
`;

export const loginConfig = gql`
    {
        storeConfig {
            pwa {
                recaptcha_login_enable
            }
        }
    }
`;

export const registerConfig = gql`
    {
        storeConfig {
            pwa {
                recaptcha_register_enable
            }
        }
    }
`;

export const featuresConfig = gql`
{
  storeConfig {
    pwa {
      features_product_enable
      features_product_url_key
    }
  }
}`;

export const categoryListConfig = gql`
{
  storeConfig {
    pwa {
      category_list_enable
      category_list_url_key
    }
  }
}`;

export const bannerSliderConfig = gql`
{
  storeConfig {
    pwa {
      banner_slider_enable
      banner_slider_title
    }
  }
}`;

export const facebookMetaConfig = gql`
    {
        storeConfig {
            pwa {
              facebook_meta_id_enable
              facebook_meta_id_app_id
            }
        }
    }
`;

export default {
    vesMenuConfig,
    popupInstallConfig,
    shareIconConfig,
    contactConfig,
    getRemoveDecimalConfig,
    pageSizeConfig,
    drawerFilterOnDesktopConfig,
    labelConfig,
    configurableOptionsConfig,
    ratingConfig,
    addToCartConfig,
    quickViewConfig,
    loginConfig,
    registerConfig,
    featuresConfig,
    categoryListConfig,
    bannerSliderConfig,
    facebookMetaConfig,
};
