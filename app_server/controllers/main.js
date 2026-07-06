const home = (req, res) => {
  res.render('index', { title: 'Travlr Getaways' });
};

const travel = (req, res) => {
  res.render('travel', { title: 'Travel' });
};

const rooms = (req, res) => {
  res.render('rooms', { title: 'Rooms' });
};

const meals = (req, res) => {
  res.render('meals', { title: 'Meals' });
};

const news = (req, res) => {
  res.render('news', { title: 'News' });
};

const about = (req, res) => {
  res.render('about', { title: 'About' });
};

const contact = (req, res) => {
  res.render('contact', { title: 'Contact' });
};

module.exports = {
  home,
  travel,
  rooms,
  meals,
  news,
  about,
  contact
};