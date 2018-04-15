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

export const collisTodayGet = (req, res) => {
  const now = Date.now();
  const currDate = now.getDate();
  const currMonth = now.getMonth();
  const currYear = now.getFullYear();
  const today = new Date(currYear, currMonth, currDate);
  const tomorrow = new Date(currYear, currMonth, currDate + 1);

  Special.find({ location: 'collis', date: { $gte: today, $lt: tomorrow } })
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

export const collisTestGet = (req, res) => {
  const now = Date.now();
  const currDate = now.getDate();
  const currMonth = now.getMonth();
  // const currYear = now.getFullYear();
  // const today = new Date(currYear, currMonth, 16);
  // const tomorrow = new Date(currYear, currMonth, 17);

  Special.find({ location: 'collis' })
  .then((results) => {
    let i = 0;
    while (i < results.length) {
      const tempDate = results[i];
      if ((tempDate.getDate() !== currDate) || (tempDate.getMonth() !== currMonth)) {
        results.splice(i, 1);
      }
      i += 1;
    }
    res.json(results);
  })
  .catch((err) => {
    console.log('err in get special by date');
    res.status(500).json({ err: 'error' });
  });
};
