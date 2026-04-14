import copy

user_data = {
    "name": "Mnraza",
    "skills": ["Python", "JS"]
}


copy_data = copy.deepcopy(user_data)
copy_data["skills"].append("Go")

print(user_data)  # ✅ safe


"""
⚠️ When NOT to use deepcopy

👉 Avoid it if:

Data is simple (no nesting)
Performance matters (deepcopy is slow)

"""