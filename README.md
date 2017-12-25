# Integrated Shopping Cart

> A Vue.js project

## Product Description

The product acts as a centralised shopping cart where items from multiple online stores can be
saved in one place. Once a user creates an account they are directed to an empty dashboard
where they can enter a link into a text box. Once a user enters a link from an online store, our
API will scrape any data from the web page, including images, title and price, and then store
that data to the user’s profile and display it on their dashboard with a link back to the item's
original site. Items saved will be displayed in a Pinterest-like fashion on their dashboard, and
the saved items will be automatically prioritised based on our prioritisation algorithm.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
