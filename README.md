# The Controversies of Science API (Usergrid Version)

A first attempt at constructing an Apigee API gateway with a Usergrid backend, for serving data to the prototype infographic viewer

## Details

To retrieve the metadata associated with each of the cards in the collection:

    curl http://worldviewer-test.apigee.net/controversies-of-science/v1/cards

The cards are broken down into 6 categories:

- *ongoing* - Recent, ongoing controversies
- *historical* - Controversies possibly still at play, but more historical in nature
- *person* - Some people you should know about + character studies
- *reform* - Relevant to academic reform and redesigning scientific discourse
- *critique* - The best critical commentary ever published for modern science
- *thinking* - How to think like a scientist about controversies

To retrieve a particular category, add it in as a query parameter:

    curl http://worldviewer-test.apigee.net/controversies-of-science/v1/cards?category=ongoing

The data is scraped from my Google Plus collection, here:

*Controversies of Science* - https://plus.google.com/collection/Yhn4Y

Coming Soon: a /cards/{cardId} route for retrieving all data associated with a particular controversy -- such as card text, Impress.js slideshows, graphics footnotes, Google Plus comments, graphics annotations.

In due time, this will be the data layer for a social network designed to crowdsource scientific controversies.

The technologies used and progress to-date are described below.

## Node.js
## ES6 / Babel
## Apigee 127's API Ecosystem
## jQuery
## Impress.js
## Animate.js / Materialize.css / SCSS

## Swagger / OpenAPI

I'll use this as an opportunity to get some experience with how API's are constructed via services.  I'll use Swagger (the OpenAPI Specification) to construct the API gateway, and I'll host that gateway with my controller and backend on Apigee's ecosystem -- hopefully setting up my own URL to access it all.

There's an excellent deep dive into the OpenAPI spec at ...

https://apihandyman.io/writing-openapi-swagger-specification-tutorial-part-1-introduction/

The a127 CLI's and Swagger UI adds a slight learning curve on top of the OpenAPI spec, but there are materials available online for these subjects.

## Usergrid BaaS

I'll set up the backend as a service (BaaS) and for now just fetch assets and references from it.  Eventually, I'll be able to use this backend to fetch all sorts of things.  In particular, Usergrid's emphasis upon mobile, elasticsearch, A/B-testing, activity streams, graph db and push notifications are all very strong pluses insofar as I can get quite far with this project with minimal code.

There's a very good overview of usergrid at ...

*Devnexus 2015 - Apache Usergrid, an open source BaaS - Lee Grey* - https://www.youtube.com/watch?v=sjjJdInSAhY

And importantly, with this approach, I can deal with the frontend as I see fit, in a completely separate manner.  This turns out to be a huge plus for my mobile UI -- which will likely prove to be far more complex than my desktop UI.  Due to the inherently graphical nature of infographics, I may need to explore mobile-based game libraries as my mobile solution.  Setting up my solution in this manner permits me to delay thinking on that problem, and get the easier solution -- desktop -- out of the door first.

Once I'm able to grab a graphic and the references for a graphic from that backend, I'll go ahead and refactor my client-side infographic viewer to pull from it.

One interesting feature of Usergrid is its location-based targeting feature.  With a sufficiently large community, this has some really amazing potential to help strengthen this community by creating opportunities for face-to-face contact between individual members of the social network when they happen to near one another -- or to alert members of some related impending activist event near them.

## Social Network Scripting

One intriguing possibility with the BaaS logic is that I could, in theory, use gplus (and if necessary, Cheerio, as a jQuery interface to gplus) to synchronize my content between gplus and the BaaS.

New posts to my Controversies of Science collection would automatically appear on the backend and activity feed.

Likewise, a comments script -- perhaps run more frequently -- could make sure that posted comments also appear.

Using this approach, I might also (?) be able to incorporate Twitter and Instagram (FB I'm not so sure about).

I might also create tools, along these lines, which automatically identify gplus posts which are in some manner related to a pre-existing controversy card.

Due to the low overhead of creating complex BaaS systems, I can in theory accomplish quite a bit with minimal amounts of coding.

## Progress

*Wednesday, December 21, 2016 4:00pm* - First mocked-data version of API goes online at http://worldviewer-test.apigee.net/controversies-of-science/api/cards, now ready to create my first BaaS data.  At this point, I am at around 170 controversy cards.

*Wednesday, December 21, 2016 6:00pm* - Identified the G+ request to fetch images and associated text from my G+ Controversies of Science collection, placed information into file /api/controversies-of-science/gplus-request-info.txt.

*Thursday, December 22, 2016 5:30pm* - Now successfully mocking the bulk of my two first API requests with Google Plus data.  Need to now set up my BaaS and create a script to populate it with my Controversy Card data.  Image files should exist on the BaaS.

*Thursday, December 29, 2016 9:00pm* - Have finally successfully connected to Usergrid!  They just upgraded their BaaS trial service, but did not update any of their doc's to reflect the new config that must be sent to usergrid.client().  I am basically ready to start populating Usergrid w/ data.

*Friday, December 30, 2016 4:00pm* - I've set up the Apigee app and controller to work with ES6 -- which also required some tinkering with my Sublime eslinter.  It's now working, and I'm now ready to refactor the app to ES6.  I really wanted to do this in order to enable me to better structure my app (with modules and promises), and get some further practice with ES6 coding.  I've come to really appreciate the double arrow, let and modules additions since using them.

*Monday, January 2, 2017 4:00pm* - I've populated the backend with the full Google+ collection.  I'm currently only storing information about each card (as would appear in a feed).  In order to access a particular controversy card, I'll have to ...

(0) Backend.getMetaCards() should be able to paginate, so that the full list of cards can be retrieved, when needed. (ADDED LIMIT 500)

(1) Create the /cards/{cardId} endpoint in the controller. (DONE, JUST THIS ONE CARD ... SEE card-example.json)

(2) Set up /cards/{cardId} endpoint to contain Impress.js slideshow data. (DONE)

(3) Add footnotes to this same endpoint. (DONE)

(4) Pick one particular graphic -- preferably one of the simpler zooms -- to demo this for. (USING THE SAME FORMER EXAMPLE, NOT A CONTROVERSY CARD)

(5) Set up AJAX requests and Javascript to generate the slideshow and footnotes DOM.

(6) I should also just go ahead and remove all of the mobile support for now, as I expect to get to that much later.  This MVP will not be responsive, because Impress.js does not currently work on mobile. (DONE)

(7) It would be nice to be able to query /cards with ?category=<category>, but I want the information encoded into the Google Plus collection so that it will automatically re-appear in the event that I need to re-scrape the collection.  So, I'm removing all of the old controversy card hashtags, and replacing them with one of: #ongoing, #historical, #critique, #reform, #person, #thinking.  Then, I'll program this into the scraper. (DONE)

Some observations on Apigee's usergrid interface ...

(1) Updating a particular entity requires the UUID, as well as a different approach than is used for creating the collection.  It's not sufficient to simply supply the entity name.

(2) If you don't supply a UUID, Apigee's response may suggest that it works -- but it does not (yikes).

(3) Attempting to POST an entity with a name which already exists will result in a NOOP.

*Monday, January 2, 2017 8:30pm* - Fetching cards from API by category via query parameter now works.  Next step is to set up /cards/{cardId} endpoint.

*Tuesday, January 3, 2017 1:00pm* - Removed mobile interface, really need to spend some time refactoring what remains of this HTML.  The social elements are cluttering the code, the JSON should be pulled out, and I should validate that it's actually working (on top of all of the API/AJAX work left to do).

*Tuesday, January 3, 2017 10:30pm* - I've set up a sample resource at /cards/76b02dc7-d246-11e6-61b-0ad881f403bf which includes both the footnotes and the Impress.js slides -- which means that I can now dynamically generate this DOM using the API.  The deploy process takes an hour+, unfortunately, so I've set it running, and will implement the AJAX in the morning.  This should dramatically simplify my (ugly) markup.

Still wishing there was a way to container my social markup.  At a minimum, I'm going to at least sequester all of the comments out of the HTML and into a document.  Also, now that the mobile has been removed, I can now remove all of those mobile images that are not being used for social media.

Wednesday: (1) Check status of each of the share images; (2) Create AJAX; (3) Set up social doc; (4) Sidenav needs to scroll as active list item moves down the screen; (5) Would be nice to refactor all jquery into ES6.

*Thursday, January 5, 2017 10:30pm* - There is a bug in Apigee's proxy versioning system which precludes me from saving revisions.  Either way, I've been able to get past the CORS problem by creating a new proxy with their wizard, checking off the CORS checkbox at the moment of creation, directing my a127 project to this new gateway, then deploying to it.  I'm able to validate that this all works from both cli and inside of my client app (which contains an api test request).  I may not have time over the coming days to work on this, but I'm now ready to pull all slides and footnotes from the API for my test card.

(this broke with a subsequent deployment, CORS support seems brittle)

*Sunday, January 9, 2017 8:00pm* - Refactored jquery out of my client-side Javascript, where possible.

*Monday, January 9, 2017 3:00pm* - CORS support is easy to undo with these deployments, so from here on, I will not deploy to the same proxy.  All future changes to the proxy will base upon copies of this one.

Some notes for myself, when the proxy is not working:

(1) Clone repo and remove all devDependencies from package.json.  npm install.  Note that I have saved the original version of package.json with developer dependencies into ./package-dev.json, for future development of proxy.

(2) Make sure that the basepath and name for the Proxy match the two endpoint names in package.json.

(3) a127 project deploy from dir w/ package.json

(4) Upload the working saved proxy revision on disk as a new revision.

(5) Make sure that all necessary Node files appear beneath "Scripts" in Proxy -> Develop.

(6) Save and deploy to test.

*Monday, January 9, 2017 9:45pm* - With CORS working, I am now able to populate the infographic viewer with slides and footnotes from the API.

As I worked through this, it became apparent that a more solid Promise() approach was necessary to step through the sequence of events required to asynchronously set up the interface: API data -> initialize the side nav -> show the side nav + large graphic -> load impress.js -> setup the hash change event handler.