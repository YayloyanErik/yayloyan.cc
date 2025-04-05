#!/bin/bash
read -p 'GitHub username: ' user
curl -s https://api.github.com/users/$user/repos?per_page=100 | grep -o 'git@[^"\,]*' | xargs -L1 git clone