> August 7 2021

### What is f5?
F5 is an open source website-as-a-serve & component library built in React, Typescript, Nx, and Firebase. The project supports vending websites and blogs to anyone who requires one, free-of-charge.

### Why is f5?
The project is designed to disrupt the website-as-a-service industry by giving away all code for free. All internal components are also vended as npm packages.

I envision a future where anyone can build a web app in minutes, thereby dropping the barrier to entry of sectors like social media, content creator subscription, and personal websites by hundreds of thousands of dollars. My view is that you shouldn't have to be a corporation to compete in this sector.


> July 22 2020

### F5
F5 started out as a multiplayer, player-built choose your own online text adventure.

I wrote code to support different hosting different types of text adventures with only the one codebase. For instance, you could create a live config that would define a "one word story" text adventure. This would be deployed along with any other configurations on each deploy.

The one word story almost served like a blog and before I knew it, I was using f5 to serve my blog.

Since then, I've mostly abandoned the text adventure apps (though they still work to my knowledge).

Now the focus is building out this blog. It has very strange patterns. Here are the key features:
* you can define values in the live config which are then bundled with the app at build time
* you can define build-time file overrides by appending your app name to any existing file in the codebase
* you can add whitelisted React components to your markdown in blog posts and they will render correctly

It's been an interesting experiment. I will continue to simply use this as a playground for proofing React components and hosting random tools or widgets I build.

> April 24 2020

### F5

F5 is a massive multiplayer online text adventure.

The multiplayer component is that if you reach the end of the "adventure" by following a certain path you have to wait for someone else to add the next part of the story, but currently that's not enforced. Once someone replies, the adventure continues.

### Play it
https://parm.app/

### Development
Fetch code and start dev server.
```sh
git clone https://github.com/prmichaelsen/parm.git
```

Install dependencies.
```sh
npm i
```

You will need run some utlity scripts to setup your environment before it will build correctly.
The ultility scripts depend on `ts-node`, so you will need to install `ts-node` as a global dependency in order to run them.

If this is your first time using `npm`, you should probably set your npm `prefix` in your `config` to a sub-directory of your `$HOME` (or shorthand, `~`).

See [this stack overflow post](https://stackoverflow.com/questions/54802330/missing-write-access-in-mac-to-usr-local-lib-node-modules) for an explanation why you would do this.

```sh
mkdir ~/.npm-global;
npm config set prefix '~/.npm-global';
touch ~/.profile;
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile;
source ~/.profile;
```

> on a unix-like system: touch creates a file, echo ... >> ... appends to a file, source (or shorthand, `.`) loads the .profile configuration into your current terminal session, and ~/.profile is a special config file that is loaded each time a terminal session is initiated

Now, install `ts-node` globally via:
```sh
npm i -g ts-node
```

You'll need some "admin secrets", reach out to me if you want to run this locally and I can work with you.

Alternatively, you may supply your own secrets to run your own admin database. As of 2021 Jul, no one has done that, so update this document accordingly with your learnings.

Once you have the admin secrets, you will fetch additional "service secrets" secrets from the secret vault.
```sh
./tools/scripts/f5/fetch-secrets.ts
```
This file uses a shebang to set the "intepreter" to ts-node so you can run a .ts 
file as though typescript was running through an intepreter without having to 
transpile to javascript first. 📸

To prepare app `parm` for dev we must first `pre-bundle` it. This configures
some options in the `workspace.json` and creates some additional source
files with some application metadata.
```sh
./tools/scripts/f5/0-deploy.ts parm pre-bundle
```

We also need to generate an `index.local.html` for local dev.
```sh
./tools/scripts/f5/0-deploy.ts parm post-bundle
```

Now we're ready to start the app (finally).

Run a specific app for local development:
```sh
npm run nx run f5:serve:parm
```
This notation runs the `serve` architect for the `f5` application using the `parm` configuration.
To see the architects and configs avaiable, view the `workspace.json` at the root of this repository.
For information on a `workspace.json`, refer to the official `nx` documenation.

For more dev info, see [DEV_README](./DEV_README.md).

### Troubleshooting
#### no index.local.html found
> ✖ ｢wdm｣: Error: ENOENT: no such file or directory, open '/Volumes/LaCie 1/_workplace/parm2/apps/f5/src/index.local.html'

This means you tried to run 
```sh
npm run nx run f5:serve:parm
``` 
without first running
```sh
./tools/scripts/f5/0-deploy.ts parm post-bundle
```

## Deployment
Login with firebase. Then:
```sh
firebase use --add parm-app
```

Now, deploy an f5 app:
```sh
./tools/scripts/f5/0-deploy.ts APP_NAME
```

This script:
* pulls the live config for each app from firestore
* bundles the apps
* updates the dist with some assets
* deploys to firebase hosting 

### Data Backup
See `./tools/scripts/f5/backup.ts` for a method to download all firestore data.

### Roadmap
* loading button 🔴9️⃣
* node repository / browser for discovering and easily adding common nodes 🟡9️⃣
* 🟡9️⃣🐞 fix default favicon, meta image in post-bundle step 
* unfurl nodes (react helmet or static rendering on backend for external page loads) 🟡9️⃣
* tweak UI to be less frustrating 🟡6️⃣
* duplicating nodes 🟡6️⃣
* censoring feature (my mom doesn't like all the nasty words i use in my blog. i will add a feature that allows a find and replace to swap out naughty words with words like "frick" and "gosh") 🟡6️⃣ 
* edit node id: duplicate node, update references to old node id to use new node id in other nodes, update old node to be an interstitial page that redirects to the new node 🟡6️⃣
* slide show cards (group cards in a specific order and allow swiping left to right to navigate them) 🟡3️⃣
* spa nav for node links 🟢9️⃣
* left-to-right and top-to-bottom toggles 🟢3️⃣
* set default top-to-bottom via device media query 🟢3️⃣
* set default theme coolor via theme pref media query 🟢3️⃣
* algorithmic selection of available options 🟢6️⃣
* share options 🟢3️⃣
* typeaheads 🟢3️⃣
* previously submitted subreddits green circle 🟢3️⃣
* subreddit validation 🟢3️⃣
* error message for failed subreddit submissions 🟢3️⃣
* delete node: update node to be "deleted" and show a message indicating this node has been deleted. 🟢0️⃣
* delete node: if you are the author, you see a message to reinstate it. 🟢0️⃣
* delete node: if you are not the author, you see a message to request the author reinsate it, if an author for the node exists 🟢0️⃣ 
* toasts 🟢0️⃣
* some notification system for when someone has replied to your option that previously had 0 children 0️⃣
* report 0️⃣
* music sharing app 0️⃣
* animate button slider 0️⃣
* animate new option loading 0️⃣

### Completed Roadmap
The newest features are at the top of this list.
* node aliases 🔴9️⃣
* generalize core code for use in other apps 0️⃣
* theming
* tap to show menu 🟢9️⃣
* track node views
* track num times chosen 🟡6️⃣
* favorites 🟢6️⃣
* perma-link to a node 🟡6️⃣
* go back 🟡3️⃣
* routing for each selection 🔴9️⃣
* markdown support
* cookie to enforce users can't reply to self
* random option selection re-selects on every render
* edit 0️⃣
* youtube embed
* direct image linking for sites like reddit

### Not on roadmap
* replies
* horizontal colored bars with length corresponding to reply nest level on each reply
* control cards, ie filter, map, reduce, sort
  * control cards will be a top level type card that can influence
    presentation of the cards on the page
* could allow configuration to reuse existing databases, for quick aliasing new domain names to re-use parm
* could allow using ace editor for creating cards

### Key
This key is allows me to label roadmap items. Not everything will be assigned labels.

If I provide two keys for one category, it means its somewhere inbetween.

* 🟢🟡🔴 -  urgency, 🔴 being the most urgent
* 0️⃣3️⃣6️⃣9️⃣ -  most important, 9️⃣ being the most imporant, 0️⃣ being optional
* ✨🐞 - feature, bug

### FAQ

#### What if someone tries to make every option "you died"? That's no fun.
No that's fine. It's a build your-own-adventure. I'm not going to make up any rules about how you should play _your_ adventure. Anything can happen in the adventure. So your character died. What happens next?

### Design
#### Option Selection Design
The plan is to eventually intelligently select which options to display based on some criteria
such as
* longest path
* newest
* most travelled

> Open Question: which selection criteria not mentioned here would help enrich the gaming experience?

### Feedback
If you have feedback, create an issue or use the [google forms feedback link](https://docs.google.com/forms/d/e/1FAIpQLScNyQH8qODIN7895f7duAT3_NsQ54NfRiFzMr5yquhh5Aa_6A/viewform?entry.800675036=fuck+fuck+fuck+fuck+fuck).
