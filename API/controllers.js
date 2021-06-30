// importing data
let kayaks = require('../kayaks');
// packages
const slugify = require('slugify');

// =====================// fetch all kayaks //=========================== //
exports.fetchKayak = (req, res) => res.json(kayaks);
// delete single kayak
exports.deleteKayak = (req, res) => {
  // getting the kayak id from the url
  const { kayakId } = req.params;
  // check if the kayak is exists
  const foundKayak = kayaks.find((kayak) => kayak.id === +kayakId);
  // if the kayak exists send all the kayaks except this kayak
  if (foundKayak) {
    kayaks = kayaks.filter((kayak) => kayak.id != +kayakId);
    res.status(204).end();
  } else {
    // if the kayak is not exists send a message says that it is not exists
    res.status(404).json({ message: `kayak Id ${kayakId} is not found` });
  }
};
// =====================// create kayak //=========================== //
exports.createKayak = (req, res) => {
  // setting new id manually
  const id = kayaks.length + 1;
  // creating slug for the new kayak
  const slug = slugify(req.body.name, { lower: true });
  // getting the new kayak from the front end
  const newKayak = {
    id,
    slug,
    ...req.body,
  };
  // adding the new kayak to the existing kayaks list
  kayaks.push(newKayak);
  // sending the new kayak to the front end
  res.status(201).json(newKayak);
};
// =====================// update kayak //=========================== //
exports.updateKayak = (req, res) => {
  // getting the kayak id from the url
  const { kayakId } = req.params;
  // checking if the the kayak is exists
  const foundKayak = kayaks.find((kayak) => kayak.id === +kayakId);
  // if the kayak is exist get the data from front end
  if (foundKayak) {
    // get all the data icluding the field that is not updated by the client
    for (const key in req.body) foundKayak[key] = req.body[key];
    // setting the slug if the client didn't rename the kayak
    foundKayak.slug = slugify(foundKayak.name, { lower: true });
    res.status(204).end();
  } else {
    // if the kayak not found send a message said that the kayak is not found as JSON
    res.status(404).json({ message: `kayak Id ${kayakId} is not found` });
  }
};
