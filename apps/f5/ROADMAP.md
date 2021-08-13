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
--
* options: define node options on per node basis. e.g. "displayAuthor"
* shorthands 
    * #post-id - notifies author their post was mentioned, anchor links to the node
    * @user - tags a user 
    * **filter-name - "dereferences" a filter pointer and "applied the filter"
* text, type, data, meta and options editors 
* advanced edit which allows you to define the entire node in YAML
* text, type, data etc are pulled from the YAML
* breadcrumbs are just nodes chained in sequence 
* add a "vscode text preview scroller" to sidebar 
    * potentially re use as a breadcrumb selector 
    * can label each node 1, 2.. 3
    * can add a numberic node selection editor,
    * can add skip to top/bottom
    * can reuse as a node pagination 
* animate transitions between bread crumb nodes
* next / prev navigate between nodes
* adjust website theme (admin)
* website live `settings.json`

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

### Feedback
If you have feedback, create an issue or use the [google forms feedback link](https://docs.google.com/forms/d/e/1FAIpQLScNyQH8qODIN7895f7duAT3_NsQ54NfRiFzMr5yquhh5Aa_6A/viewform?entry.800675036=fuck+fuck+fuck+fuck+fuck).
