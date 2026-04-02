# Arithmetic Operators

a = 10
b = 3

print(a + b)   # 13
print(a - b)   # 7
print(a * b)   # 30
print(a / b)   # 3.33 (float)
print(a // b)  # 3 (floor division)
print(a % b)   # 1 (remainder)
print(a ** b)  # 1000 (power)

# Comparison (Relational) Operators
print(5 > 3)    # True
print(5 == 5)   # True
print(5 != 3)   # True
print(5 <= 2)   # False

# Logical Operators
print(True and False)  # False
print(True or False)   # True
print(not True)        # False

# Assignment Operators
x = 5
x += 2   # x = x + 2
x *= 3
x -= 1

# Membership Operators
nums = [1,2,3]

print(2 in nums)      # True
print(5 not in nums)  # True

# Identity Operators
# 👉 Compare memory (you learned this)
a = [1,2]
b = a
c = [1,2]

print(a is b)   # True
print(a is c)   # False

# Bitwise Operators 
a = 5   # 101
b = 3   # 011

print(a & b)  # 1
print(a | b)  # 7
print(a ^ b)  # 6

# ⚠️ / vs //

5 / 2   # 2.5
5 // 2  # 2


# ⚠️ == vs is

a = [1]
b = [1]

print(a == b)  # True
print(a is b)  # False