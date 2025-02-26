set -eo pipefail
rm -rf package
cd my_function
pip3 install --target ../package/python -r requirements.txt