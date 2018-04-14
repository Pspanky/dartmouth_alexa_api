import Special from '../models/DDSspecial_model';

export const createSpecial = (req, res) => {
  const newSpecial = new Special();
  newSpecial.name = req.body.name;
  newSpecial.meal = req.body.meal;
  newSpecial.location = req.body.location;
  newSpecial.date = req.body.date;
  newSpecial.ingredients = req.body.ingredients;

  newSpecial.save()
  .then((result) => {
    res.json({ message: 'Special created!' });
  })
  .catch((err) => {
    console.log('err in create');
    res.status(500).json({ err });
  });
};

export const testGet = (req, res) => {
  Special.find()
  .then((results) => {
    res.json(results);
  })
  .catch((err) => {
    console.log('err in get special by date');
    res.status(500).json({ err: 'error' });
  });
};

export const findSpecialsByDateAndLocation = (req, res) => {
  Special.find({ date: req.body.date, location: req.body.location })
  .then((results) => {
    res.json(results);
  })
  .catch((err) => {
    console.log('err in get special by date');
    res.status(500).json({ err: 'error' });
  });
};

export const collisGet = (req, res) => {
  Special.find({ location: 'collis' })
  .then((results) => {
    console.log(results[0]);
    console.log(results[0].date.getDate());
    console.log(results[0].date.getMonth());
    console.log(results[0].date.getFullYear());
    res.json(results);
  })
  .catch((err) => {
    console.log('err in get special by date');
    res.status(500).json({ err: 'error' });
  });
};
