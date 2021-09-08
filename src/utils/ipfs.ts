const { create } = require("ipfs-http-client");

const ipfs = create({
  host: "ipfs.infura.io",
  port: "5001",
  protocol: "https",
});

export async function get(cid: string) {
  const getFile = await ipfs.object.get(cid);
  return Buffer.from(getFile.Data).toString();
}
