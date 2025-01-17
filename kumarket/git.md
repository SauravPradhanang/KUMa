# git instructions:

1. to see the status of your files:

    - to see the modified files yet to be committed.
    - use this command in the terminal: 
        ```sh
        git status
        ```
    <br>
2. to commit your changes:

    - first, stage your changes. stage means to command git to track your changes. 
    - use this command in the terminal: 
        ```sh
        git commit -m commit_message
        ```
    <br>
3. to push your commits:

    - use this command:
        ```sh
        git push origin branch_name
        ```
    <br>
4. to identify your current working branch:

    - use this command in the terminal: 
        ```sh
       git branch
        ```
    <br>
5. to create a new branch different from main:

    - create new branch to try new changes in your files without any concerns about affecting the main branch content.
    - use this command in the terminal:
        ```sh
         git checkout -b your_branch_name
        ```
        *this command will create a new branch and immediately switch to it.*
    <br>
6. to switch to another branch:
    
    - before switching your branch make sure you commit or stash your changes of your current branch. 
    - to commit your changes use the command above.
    - to stash your changes, look at instruction no. 5.
    - use this command in the terminal:
        ```sh
        git checkout branch_name.
        ```
    <br>
7. to stash your changes:

    - stash means to temporarily stash your changes elsewhere to work or to pull or to switch to another branch. you can later retrieve it using some commands mentioned below:
    - use this command in the terminal:
        
        a. git stash:
        ```sh
        git stash
        ```
        *when your use this command, git will stash your changes elsewhere and restore your work to the last committed state.*

        b. git stash list:
        ```sh
        git stash list
        ```
        *use this command to see all the stashes you have saved with an identifier.*

        c. git stash apply:
        ```sh
        git stash apply
        ```
        *use this command to apply your most recent changes while keeping that stash in the list.*

        d. git stash pop:
        ```sh
        git stash pop
        ```
        *use this command to apply your most recent changes and remove that stash from the stash list.*

        e. git stash apply stash no.:
        ```sh
        git stash apply stash@{n}
        ```
        *here the n is the index from your stash list.  use this command to apply your changes from the list.*

        f. git stash clear:
        ```sh
        git stash clear
        ```
        *use this command to delete all your stashes from the list.*

        g. git stash --staged:
        ```sh 
        git stash --staged
        ```
        *use this command to stash your changes that are in the staging area, leaving your unstaged changes intact.*
        <br>
8.  to clone or pull any branch or repo:

    - to clone a repo:
        ```sh
        git clone <repo_url>
        ``` 
        *check the url from github -> code -> https url.*

    - to pull any branch:
        ```sh
        git pull origin branch_name
        ```
        <br>
9. to merge your current branch to another branch:

    - *use this command to first merge 'main' branch to your branch then resolve the conflicts like which code is to be accepted, etc. then use this command again to merge your branch to 'main'.*

    - use this command in the terminal:
        ```sh
        git merge branch_name
        ```
        *after you merge your branch to 'main', it will create an extra commit i.e. the merge commit. then push the commit to main.*

