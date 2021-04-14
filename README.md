# Group Project #1 - Movie Master

## Dave's Git Hints:
### Creating a feature branch

1. **DON’T BE A NOOB LIKE ME 😂** 
2. Make sure you are on the main branch!!! As these are the files you want to be working from! `git checkout main`
3. Create feature branch `git checkout -b <branch name>`

example name. `m10-search-by-title`

### Somebody changed something on your main branch and you want it in your feature branch?
Probably not a great idea if you are working on the feature with somebody else. If so, **communicate** 

1. **In your feature branch (checked-out)** Stash whatever you are working on (these will be changes since your last commit) These just go to a holding area. `git stash`
2. Jump onto main branch `git checkout main`
3. Pull down latest changes `git pull`
4. Jump back onto feat branch `get checkout <feaure-branch-name>`
5. Pull(you are actually just doing a merge) main into your feature `git pull origin main`
6. Prob going to get a text editor pop up (mine is nano) for a commit message just save this and exit (nano - `ctrl + o`(output/save) `enter`then `ctrl + x` to exit) if vi/m. Write and quite (enter cmd mode (`esc key` then `:wq`) This is just to change the message on the merge (will show up in github, default generated is fine)
7.  Bring your stashed changes back `git stash pop` (removes saved stash, can use `get stash apply` to keep)

## Links
- Ideas Mindmap(miro - DH): https://miro.com/app/board/o9J_lLCDpmA=/
- Press Release(gDocs - RD): https://docs.google.com/document/d/1Q2Gf5zk3omoVm2tt6A052eonAAIgv9Tv5nCK8J4AOdo/edit
- User Story Map(miro - RD): https://miro.com/app/board/o9J_lLHiAz8=/

## Technology Used
- Bulma: https://bulma.io/documentation/
- OMDb API(Movie Info): http://www.omdbapi.com/
- Utelly API(Streaming Services Search): https://rapidapi.com/utelly/api/utelly/pricing
