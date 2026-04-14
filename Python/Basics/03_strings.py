# 👉 Strings are IMMUTABLE

s = "hello"
# s[0] = "H"   # ❌ TypeError: 'str' object does not support item assignment

# 👉 You cannot change characters directly

# Slicing
print(s[0:3])   # hel
print(s[:3])    # hel
print(s[2:])    # llo
print(s[::-1])  # olleh (reverse)

# Membership
print("he" in "hello")   # True

# Case Conversion

s.upper()   # "HELLO"
s.lower()   # "hello"
s.title()   # "Hello"

# Remove Spaces
s.strip()   # "hello"
s.lstrip()  # left remove
s.rstrip()  # right remove

# Replace
s.replace("world", "python")
# "hello python"

# Split & Join (VERY IMPORTANT)
s = "a,b,c"

s.split(",")  
# ['a', 'b', 'c']
lst = ['a', 'b', 'c']

",".join(lst)
# "a,b,c"

# Find / Index

s.find("l")   # 2
s.index("l")  # 2

# Difference:
# find()  → returns -1 if not found
# index() → gives ❌ error if not found

# Count
"hello".count("l")  # 2

# Startswith / Endswith
"hello".startswith("he")  # True
"hello".endswith("lo")    # True

# String Formatting (VERY IMPORTANT)
# 🔹 f-strings (BEST WAY)
name = "Mnraza"
age = 31

print(f"My name is {name} and age is {age}")

format()
"My name is {}".format("Mnraza")

# Escape Characters
print("Hello\nWorld")  # new line
print("Hello\tWorld")  # tab

# Useful Checks
"123".isdigit()   # True
"abc".isalpha()   # True
"abc123".isalnum() # True

# Iterating String
for ch in "hello":
    print(ch)

# 🔥 Key Rules (VERY IMPORTANT)
# 👉 Strings are:
    # immutable ❗
    # iterable ✔️
    # ordered ✔️