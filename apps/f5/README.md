### What is f5?
> August 7 2021
F5 is an open source website-as-a-serve & component library built in React, Typescript, Nx, and Firebase. The project supports vending websites and blogs to anyone who requires one, free-of-charge.

### Why is f5?
The project is designed to disrupt the website-as-a-service industry by giving away all code for free. All internal components are also vended as npm packages.

I envision a future where anyone can build a web app in minutes, thereby dropping the barrier to entry of sectors like social media, content creator subscription, and personal websites by hundreds of thousands of dollars. My view is that you shouldn't have to be a corporation to compete in this sector.

#### Feedback
If you have feedback, create an issue or use the [google forms feedback link](https://docs.google.com/forms/d/e/1FAIpQLScNyQH8qODIN7895f7duAT3_NsQ54NfRiFzMr5yquhh5Aa_6A/viewform?entry.800675036=fuck+fuck+fuck+fuck+fuck).

Contents:
* [DEV_README](./DEV_README)
* [DEV_FAQ](./DEV_FAQ)
* [ROADMAP](./ROADMAP)

### F5
> July 22 2020
F5 started out as a multiplayer, player-built choose your own online text adventure.

I wrote code to support different hosting different types of text adventures with only the one codebase. For instance, you could create a live config that would define a "one word story" text adventure. This would be deployed along with any other configurations on each deploy.

The one word story almost served like a blog and before I knew it, I was using f5 to serve my blog.

Since then, I've mostly abandoned the text adventure apps (though they still work to my knowledge).

Now the focus is building out this blog. It has very strange patterns. Here are the key features:
* you can define values in the live config which are then bundled with the app at build time
* you can define build-time file overrides by appending your app name to any existing file in the codebase
* you can add wokelisted React components to your markdown in blog posts and they will render correctly

It's been an interesting experiment. I will continue to simply use this as a playground for proofing React components and hosting random tools or widgets I build.


### F5
> April 24 2020

F5 is a massive multiplayer online text adventure.

The multiplayer component is that if you reach the end of the "adventure" by following a certain path you have to wait for someone else to add the next part of the story, but currently that's not enforced. Once someone replies, the adventure continues.

### Play it
https://parm.app/ 

``` 
// as of 2021, this link is for the blog. try using:
```
https://fuckfuckfuckfuckfuck.app
``` 
// end edit
``` 
### FAQ

#### What if someone tries to make every option "you died"? That's no fun.
No that's fine. It's a build your-own-adventure. I'm not going to make up any rules about how you should play _your_ adventure. Anything can happen in the adventure. So your character died. What happens next?

#### Design
##### Option Selection Design
The plan is to eventually intelligently select which options to display based on some criteria
such as
* longest path
* newest
* most travelled

> Open Question: which selection criteria not mentioned here would help enrich the gaming experience?