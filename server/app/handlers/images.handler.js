import path from "path";

export default class {
  // Find and return given image
  static getImage = async (req, res) => {
    const image = req.params.image;
    console.log(image);

    if (!image) {
      res.status(400).send({
        message: `Missing image parameter`,
      });
      return;
    }

    try {
      const imagePath = path.join("/server/app/uploads/" + image);
      res.sendFile(imagePath);
    } catch (error) {
      res.status(500).send({
        message: `Error retrieving image ${image}`,
      });
    }
  };
}
