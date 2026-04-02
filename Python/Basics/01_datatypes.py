"""
 🧠 Common Python Data Types
 
Int
Float
Complex Numbers
Boolean 
String
List []
Tuple ()
Dictionary {}
Set {}
NoneType
"""
# 1. Numeric Types

x = 10        # int
y = 3.14      # float
z = 2 + 3j    # complex (rare)

# print(type(x))
# print(type(y))
# print(type(z))

# 2. String (str)

name = "Mnraza"

# 👉 Immutable (cannot change directly)

name = "Crush"
print(name)

# 3. List (list)
# Ordered, mutable collection

nums = [1, 2, 3]

# ✔️ Can modify:
nums.append(4)

# 4. Tuple (tuple)

"""
Ordered, immutable collection

👉 Faster than list, cannot change
"""
point = (10, 20)

# 5. Dictionary (dict)

# Key-value pairs (VERY IMPORTANT)

user = {
    "name": "Mnraza",
    "age": 20
}
# 👉 Used everywhere (APIs, JSON, DB)

# 6. Set (set)
# Unordered, unique values

s = {1, 2, 3}

# 👉 No duplicates:
# {1,1,2} → {1,2}

# 7. Boolean (bool)
True
False

# 8. NoneType (None)
x = None

# 👉 Means “no value”

"""
Mutable vs Immutable

🔴 Immutable:
int, str, tuple
👉 creates new object on change

🟢 Mutable:
list, dict, set
👉 changes in place

Comparison

| Type  | Ordered  | Mutable   | Example |
| ----- |----------| ----------| ------- |
| list  | ✅       | ✅       | `[1,2]` |
| tuple | ✅       | ❌       | `(1,2)` |
| dict  | ❌       | ✅       | `{a:1}` |
| set   | ❌       | ✅       | `{1,2}` |

"""
# ⚠️ Important properties of set
# ❌ No duplicates
# ❌ Unordered
# ✅ Mutable

# 👉 If you want an immutable set:

fs = frozenset([1,2,3])

# ❌ cannot add/remove
# ✅ used in advanced cases

# 🧠 Key Rule
# 👉 “Set elements must be immutable”


# In Python:
# Every value has:
# 1. type
# 2. identity (memory)
# 3. methods / behavior

# ✅ Numbers are objects
x = 10
# print(type(x))        # <class 'int'>
# print(x.bit_length())

# ✅ Strings are objects
s = "hello"
# print(s.upper())

# ✅ Functions are objects
def greet():
    return "Hi"

# print(type(greet))

# ✅ Classes are objects
class A:
    pass

# print(type(A))

# 👉 are also objects:
# None
# True
# False

# print(type(None))   # <class 'NoneType'> 
# print(type(type(10)))

"""

🧠 What is type?

👉 type itself is a class

It is the metaclass (class of all classes)

"""

x = 10
x = 12

"""

Step 1: 

x = 10

👉 Python:
Creates an integer object 10 in memory
Stores reference in variable x

x ───▶ 10 (object in memory)

✅ Step 2:

x = 12

👉 Python:

Creates (or reuses) object 12
Reassigns x to point to new object
Old reference to 10 is removed (if unused → garbage collected)

Before:
x ───▶ 10

After:
x ───▶ 12


👉 Python variables are references (labels), not boxes

x does NOT “contain” 10
x points to object 10


⚠️ Important: Objects are immutable (for ints)
x = 10
x = x + 2

👉 This does NOT modify 10
👉 It creates a new object 12

⚡ Deep Insight

Immutable:
int, str, tuple → new object on change

Mutable:
list, dict, set → same object modified

"""

