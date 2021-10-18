import axios from "axios";

export const Baseurl = "https://api-uat-ezycommerce.ezyflight.se/";

const identifier = "9d7d6eeb25cd6083e0df323a0fff258e59398a702fac09131275b6b1911e202d"

export const GET = async function (route) {
    try {
      return await axios.get(Baseurl + route, {
        headers: {
          "Tenant-Identifier": identifier,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };