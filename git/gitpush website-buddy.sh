echo Name the commit:
read commit

echo Password:
read password

cd ..

user="Alex"
user_email="82574450+alexstevovich@users.noreply.github.com"
user_id="alexstevovich"
repo_id="website-buddy"

git add --all
git config user.name $user
git config user.email $user_email


git_user=$(git config user.name)
git_email=$(git config user.email)

echo ""
echo ""
echo "Target: $repo_id"
echo "User: $git_user"
echo "UserEmail: $git_email"
echo "Commit Name: $commit"
read -p "Do you want to commit with these settings?" -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]
then
	echo ""
	read -p "push has been canceled ..."
    exit 1
fi

git add --all
git commit -m $commit
git push https://$user_id:$passwordrd@github.com/$user_id/$repo_id.git main

echo ""
read -p "All Done! Press any key to close ..."