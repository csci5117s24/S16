// this file is not meant to be run like a "function" -- it's just in this repo so I can use mongodb without installing it elsewhere.

const { ObjectId } = require('mongodb');
const mongoClient = require("mongodb").MongoClient;


// fill this in if you wanna run the thing!
mongodb_connection_string = ""

// scroll past this. I definitely stole it from quizlet, which I'm sorry about but the needs of teaching are unkind.
raw_data = [{"name": "reactjs", "author": "nor386 on quizlet", "kluvernote": "public data used without permission for educational purposes (sorry!)", "cards": [{"front": "Component", "back": "A piece of the UI with its own logic and appearance, which can range in size from a button to an entire page\u200b\u200b."}, {"front": "JSX", "back": "A markup syntax used in most React projects for its convenience, stricter than HTML, requiring closed tags and wrapped multiple tags\u200b\u200b."}, {"front": "className", "back": "The attribute used in React to specify a CSS class, functioning similarly to the class attribute in HTML\u200b\u200b."}, {"front": "Event Handlers", "back": "Functions triggered in response to user interactions like clicking, hovering, focusing on form inputs, etc., in React apps\u200b\u200b."}, {"front": "State", "back": "Component-specific memory in React, allowing components to \"remember\" things like the current input value or the current image\u200b\u200b."}, {"front": "useState", "back": "A Hook in React that lets you declare a state variable, providing a pair of values: the current state and a state setter function\u200b\u200b."}, {"front": "Local Variables", "back": "Variables that don't persist between renders in React, and their changes don't trigger renders\u200b\u200b."}, {"front": "Lifting State Up", "back": "A common React pattern where the state of two components is managed by their closest common parent and passed down via props\u200b\u200b."}, {"front": "isActive", "back": "A boolean state in React components that determines whether its content is visible or not\u200b\u200b."}, {"front": "Context", "back": "A feature in React that allows a parent component to provide data to the entire tree below it without passing it through props\u200b\u200b."}, {"front": "Prop Drilling", "back": "A situation in React where props are passed through many components, often leading to verbose and inconvenient code\u200b\u200b."}, {"front": "Reducer", "back": "A function in React used to consolidate state update logic outside of a component, especially useful for components with many state updates\u200b\u200b."}, {"front": "useReducer", "back": "A Hook in React used for managing state logic in a single function, offering an alternative to useState for complex state logic\u200b\u200b."}, {"front": "TaskApp", "back": "An example React component that holds an array of tasks in state and uses event handlers to add, remove, and edit tasks\u200b\u200b."}, {"front": "Props", "back": "The mechanism for passing data from a parent to a child component in React."}, {"front": "Hooks", "back": "Special functions in React that allow functional components to use state and other React features."}, {"front": "Functional Components", "back": "A simpler way to write components as functions in React, which can use state and other React features via hooks."}, {"front": "Class Components", "back": "More traditional React components defined as ES6 classes, often including methods for lifecycle events and rendering."}, {"front": "Lifecycle Methods", "back": "Functions in class components in React that get called at specific points in a component's life, such as mounting, updating, and unmounting."}, {"front": "Virtual DOM", "back": "An in-memory representation of the real DOM in React, which optimizes updates and re-rendering of the UI."}, {"front": "Keys", "back": "Special attribute used in React lists to help identify which items have changed, been added, or been removed."}, {"front": "Fragment", "back": "A React component that allows you to return multiple elements in a render method without creating an additional DOM element."}, {"front": "PropTypes", "back": "A library in React for type-checking the props a component receives."}, {"front": "Higher-Order Components", "back": "A technique in React for reusing component logic by transforming components into other components."}, {"front": "Render Props", "back": "A technique in React where a prop is a function that returns a React element, allowing for more dynamic and reusable components."}, {"front": "React Router", "back": "A library for routing in React applications, enabling navigation between different components."}, {"front": "Redux", "back": "A popular state management library often used with React to manage the state of an entire application."}, {"front": "Context API", "back": "A React API that allows for the creation of a global state that can be passed around components without prop drilling."}, {"front": "Memoization", "back": "A React optimization technique to prevent unnecessary re-rendering by caching output of expensive function calls."}, {"front": "Suspense", "back": "A React feature for handling asynchronous operations in rendering, allowing components to wait for something before rendering."}]}, {"name": "Flask", "author": "Masynthetic on quizlet", "kluvernote": "public data used without permission for educational purposes (sorry!)", "cards": [{"front": "What file do the apps CSS, javascript, and images go in?", "back": "Static"}, {"front": "What file does the HTML go in?", "back": "Templates"}, {"front": "What file does routes.py go in?", "back": "The main project folder"}, {"front": "Explain the process of the request-response cycle", "back": "1.) User issues a request to routes.py\n2.) Routes.py finds the correct HTML file and python functions in the templates folder\n3.) The HTML fetches the CSS, JS, and images it needs from the static folder\n4.) Rendered HTML is returned to the user"}, {"front": "The home page of your app should be named", "back": "index.html"}, {"front": "What are web templates for?", "back": "They allow you to edit the HTML on multiple pages all at once"}, {"front": "What should the HTML template that each page shares be called?", "back": "layout.html"}, {"front": "If using templates makes web pages the same, how can you make them differentiate slightly?", "back": "Child pages inherit the HTML from a base template but can then be edited further independently"}, {"front": "What do you put in your HTML of a base template where you want a child template to be able to add/change something", "back": "{% block content%}\n{% end block %}"}, {"front": "What does this do?\n\n{% extends \"layout.html\" %}", "back": "Tells flask that this template inherits from layout.html"}, {"front": "What should your import show?", "back": "from flask import Flask, render_template"}, {"front": "Create a new usable instance of flask and save as \"app\"", "back": "app = flask(__name__)"}, {"front": "What does this do?\napp.route(\"/\")", "back": "It is the opening line of the function that will tell flask what to do when the user visits the url \"/\""}, {"front": "Write the code that will tell flask to render the template index.html when the user visits the url \"/\"", "back": "app.route(\"/\")\ndef index():\n render_template(\"index.html\")"}, {"front": "What should the last couple of lines in your routes.py file be?", "back": "if __name__ == \"__main__\":\n app.run(debug=True)"}, {"front": "What do you use under the href attribute for the css file? why?", "back": "{{ url_for(\"static\", filename=\"css/main.css\") }}\n\nthis tells flask to generate the url that points to the css file named"}, {"front": "HTML content on a page that inherits HTML from another must go in between:", "back": "{% block content %}\n\n{% end block %}"}, {"front": "What file interacts with the database?", "back": "models.py"}, {"front": "Show the code needed to input a variable \"foo\" into an HTML template, in both the python and HTML files", "back": "HTML:\n{{ foo }}\n\nPython: (inside of app.route) \ntemplateData = {\n'variable' : 'value'}\nreturn render_template('main.html', **templateData)"}, {"front": "How does a button talk to the flask file", "back": "the href can pass variables to flask using the url"}]}, {"name": "HTML CSS", "author": "njitu on quizlet", "kluvernote": "public data used without permission for educational purposes (sorry!)", "cards": [{"front": "Identify this element <p></p>.", "back": "Paragraph Element"}, {"front": "Name five of the nine block elements of HTML5.", "back": "header, main, footer, nav, section, article, aside, figure, figcaption"}, {"front": "This HTML5 element is used to structure a quote.", "back": "The Blockquote Element"}, {"front": "What will this CSS code produce, body {background-color: \"red\";}?", "back": "It will make the background color of the body the color red."}, {"front": "Name four valid non-css values for the Image Element <img>.", "back": "src, height, width, alt"}, {"front": "This image type is best used for photographs.", "back": "JPG, JPEG"}, {"front": "What is the order of cascade for styling a webpage?", "back": "Browser default, external style sheet, embedded style sheet (internal), and inline styles."}, {"front": "This element will allow a user to type in comments, blog entries, support questions, etc.", "back": "The textarea element."}, {"front": "CSS is the acronym for what?", "back": "Cascading Style Sheets"}, {"front": "HTML is the acronym for what?", "back": "HyperText Markup Language"}, {"front": "HTTP is the acronym for what?", "back": "HyperText Transfer Protocol"}, {"front": "What three values are valid to determine the shape of an image map?", "back": "rect, circle, poly"}, {"front": "Name the seven elements that are required for a valid HTML5 webpage.", "back": "doctype, head, body, header, nav, main, footer."}, {"front": "A smaller image is used to link to a larger image.", "back": "Thumbnail"}, {"front": "This symbol precedes the characters needed to code special characters.", "back": "Ampersand &"}, {"front": "This symbol is used to style an individual element.", "back": "Hashtag #"}, {"front": "This symbol is used to style multiple elements of the same type.", "back": "Period ."}, {"front": "This punctuation mark ends all declaration statements.", "back": "Semi-colon ;"}, {"front": "The set of grouping symbols used for declaration statements.", "back": "Braces { }"}, {"front": "Name the three objects of a CSS declaration statement.", "back": "Selector, declaration property, declaration value"}, {"front": "Name the element that uses the \"method=\" attribute.", "back": "The Form Element"}, {"front": "This object takes several smaller images and combines them into a single large image.", "back": "Sprites"}, {"front": "This is the term used to link webpages.", "back": "Hyperlink"}, {"front": "This element is used to anchor down hyperlinks.", "back": "Anchor Element <a></a>"}, {"front": "This CSS selector is used to identify an element nested in another element.", "back": "Descendant Selector"}, {"front": "This is the term DOM.", "back": "Document Object Model"}, {"front": "This symbol is used to shorten the jQuery element name.", "back": "Dollar Sign - $"}, {"front": "This method causes a warning window to appear", "back": "alert()"}]}]

// form 1: just a single document
async function form1(){
    website = {_id: "1", decks: raw_data}
    const client = await mongoClient.connect(mongodb_connection_string)
    const result = await client.db("form1").collection("website").insertOne(website)
    client.close()
    return "done1"
}
form1().then(console.log)


// form 2: cards are embedded on decks
async function form2(){
    const client = await mongoClient.connect(mongodb_connection_string)
    for (const deck of raw_data) {
        await client.db("form2").collection("decks").insertOne(deck)
    }
    client.close()
    return "done2"
}
form2().then(console.log)


// form 3: cards are distinct collection, decks reference cards
async function form3(){
    const client = await mongoClient.connect(mongodb_connection_string)
    for (const deck of raw_data) {
        cards = []
        for (const card of deck.cards) {
            const res = await client.db("form3").collection("cards").insertOne(card)
            cards.push(new ObjectId(res.insertedId))
        }
        const deck2 = {...deck}
        deck2.cards = cards
        await client.db("form3").collection("decks").insertOne(deck2)
    }
    client.close()
    return "done3"
}
form3().then(console.log)


// form 4: cards are a distinct collection, cards reference their deck.
async function form4(){
    const client = await mongoClient.connect(mongodb_connection_string)
    for (const deck of raw_data) {
        const deck2 = {...deck}
        delete deck2.cards
        const res = await client.db("form4").collection("decks").insertOne(deck2)

        for (const card of deck.cards) {
            const card2 = {...card}
            card2.deck = new ObjectId(res.insertedId)
            await client.db("form4").collection("cards").insertOne(card2)
        }
    }
    client.close()
    return "done4"
}
form4().then(console.log)