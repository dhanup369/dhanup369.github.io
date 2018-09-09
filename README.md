# dhanup369.github.io
# What's the Weather Like?

## Background

Whether financial, political, or social -- data's true power lies in its ability to answer questions definitively. So let's take what you've learned about Python requests, APIs, and JSON traversals to answer a fundamental question: "What's the weather like as we approach the equator?"

Now, we know what you may be thinking: _"Duh. It gets hotter..."_

But, if pressed, how would you **prove** it?

![Equator](equatorsign.png)

## WeatherPy

In this project a Python script to visualize the weather of 500+ cities across the world of varying distance from the equator was written. To accomplish this, I utilized a [simple Python library](https://pypi.python.org/pypi/citipy), the [OpenWeatherMap API](https://openweathermap.org/api), and a little common sense to create a representative model of weather across world cities.

Objective is to create a series of scatter plots to showcase the following relationships:

* Temperature (F) vs. Latitude
* Humidity (%) vs. Latitude
* Cloudiness (%) vs. Latitude
* Wind Speed (mph) vs. Latitude

Work Flow:

* Randomly selected 500 unique (non-repeat) cities based on latitude and longitude.
* Performed a weather check on each of the cities using a series of successive API calls.
* Included a print log of each city as it's being processed with the city number and city name.
* Saved both a CSV of all data retrieved and png images for each scatter plot.

* This analysis was done using a Jupyter notebook.
* Used Matplotlib or Pandas plotting libraries.


References:

* [geographic coordinate system](http://desktop.arcgis.com/en/arcmap/10.3/guide-books/map-projections/about-geographic-coordinate-     systems.htm).

* Spent the requisite time necessary to study the OpenWeatherMap API. Based on the initial study,I was be able to answer  basic questions about the API: Where do we request the API key? Which Weather API in particular will I need? What URL endpoints does it expect? What JSON structure does it respond with?

* [citipy Python library](https://pypi.python.org/pypi/citipy). Before I  tried to incorporate the library into my analysis, started by creating simple test cases outside the main script to confirm that I was using it correctly. 

* Part of our expectation in this challenge is that you will use critical thinking skills to understand how and why we're recommending the tools we are. What is Citipy for? Why would you use it in conjunction with the OpenWeatherMap API? How would you do so?

* In building my script, I paid attention to the cities I was using in my query pool. Was I getting coverage of the full gamut of latitudes and longitudes? Or was I simply choosing 500 cities concentrated in one region of the world? Even if I were a geographic genius, simply rattling 500 cities based on the human selection would create a biased dataset. 

* Lastly, I've gained a strong mastery of the core foundations of data analytics and it will only go better from here. !

