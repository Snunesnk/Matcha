import { publicIpv4 } from "public-ip";
import { getIpToLocationFn } from "@fuzzysaj/ip-to-geo-location";

export const getIpAddress = async (req) => {
  let ipAddr;
  const forwardedIpsStr = req.header("x-forwarded-for");
  if (!forwardedIpsStr) {
    ipAddr = req.connection.remoteAddress.split(":")[3];
  } else {
    const forwardedIps = forwardedIpsStr.split(",");
    ipAddr = forwardedIps[0];
  }

  // Get external IP address
  if (ipAddr.includes("192.168.")) {
    ipAddr = await publicIpv4();
  }

  return ipAddr;
};

export const getIpInfo = async (ipAddr) => {
  const ipToLoc = await getIpToLocationFn();
  return ipToLoc(ipAddr);
};
