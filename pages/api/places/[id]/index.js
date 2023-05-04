import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Places";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const place = await Place.findById(id);

    if (!place) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(place);
  }
  if (request.method === "POST") {
    try {
      const placeData = request.body;
      const place = new Place(placeData);
      await place.save();
      return response.status(201).json({ status: "Place created." });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
  if (request.method === "PUT") {
    const placeData = request.body;
    await Place.findByIdAndUpdate(id, placeData);

    response.status(200).json({ message: `Place updated!` });
  }

  if (request.method === "DELETE") {
    await Place.findByIdAndDelete(id);

    response.status(200).json({ message: `Place deleted!` });
  }
}
