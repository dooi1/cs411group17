import requests

# Your API key
api_key = ""

# Set up the API endpoint with the API key as a query parameter
endpoint = f"https://api.spoonacular.com/recipes/findByIngredients?apiKey={api_key}"

# Define the parameters
params = {
    "number": 1,
    "limitLicense": True,
    "ranking": 2,  # Set ranking to 2 to minimize missing ingredients
    "ignorePantry": True,
}

# Prompt the user to input the list of ingredients
user_ingredients = input("Enter a comma-separated list of ingredients: ")

# Add the user-provided ingredients to the parameters
params["ingredients"] = user_ingredients

# Make the API request
response = requests.get(endpoint, params=params)

if response.status_code == 200:
    recipes = response.json()
    for recipe in recipes:
        used_ingredients = recipe.get("usedIngredients", [])
        missed_ingredients = recipe.get("missedIngredients", [])
        unused_ingredients = recipe.get("unusedIngredients", [])
        print("Used Ingredients:", used_ingredients)
        print()
        print("Missed Ingredients:", missed_ingredients)
        print()
        print("Unused Ingredients:", unused_ingredients)
        print()
        # Process the recipe data as needed
else:
    print("Request to the API failed with status code:", response.status_code)
