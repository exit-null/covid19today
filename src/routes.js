import React from 'react';
import CoronaIndia from './views/corona_india';
import CoronaWorld from './views/corona_world';
import StatewiseIndia from './views/statewise_india';
import CountrywiseWorld from './views/countrywise_world';
import C404 from './views/404';

var routes = [
  {
    path: "india",
    name: "Covid-19 India",
    icon: "tim-icons icon-chart-pie-36",
    component: CoronaIndia,
    layout: "/"
  },
  {
    path: "world",
    name: "Covid-19 World",
    icon: "tim-icons icon-chart-pie-36",
    component: CoronaWorld,
    layout: "/"
  },
  {
    path: ":id",
    name: "Covid-19 state",
    icon: "tim-icons icon-chart-pie-36",
    component: StatewiseIndia,
    layout: "/state/"
  },
  {
    path: ":id",
    name: "Covid-19 Countries",
    icon: "tim-icons icon-chart-pie-36",
    component: CountrywiseWorld,
    layout: "/country/"
  },
  {
    path: "404",
    name: "Page Not Found",
    icon: "tim-icons icon-chart-pie-36",
    component: C404,
    layout: "/"
  }
];

export default routes;
