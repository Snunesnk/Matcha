import { publicIpv4 } from "public-ip";
import { getIpToLocationFn } from "@fuzzysaj/ip-to-geo-location";

export const getIpAddress = async (req) => {
  let ipAddr = null;
  const forwardedIpsStr = req.header("x-forwarded-for");
  if (!forwardedIpsStr) {
    ipAddr = req.connection.remoteAddress.split(":")[3];
  } else {
    const forwardedIps = forwardedIpsStr.split(",");
    ipAddr = forwardedIps[0];
  }

  try {
    // Get external IP address
    const publicIp = await publicIpv4();
    if (publicIp) ipAddr = publicIp;
  } catch (err) {
    console.log(err);
  }

  return ipAddr;
};

export const getIpInfo = async (ipAddr) => {
  let ip = null;

  try {
    const ipToLoc = await getIpToLocationFn();
    ip = ipToLoc(ipAddr);
  } catch (err) {
    console.log(err);
  }

  return ip;
};
