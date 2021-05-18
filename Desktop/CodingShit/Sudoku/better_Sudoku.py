import random
def valid(board, pos, num):
    for i in range(9):
        if board[i][pos[1]] == num and i != pos[0]:
            return False

    for j in range(9):
        if board[pos[0]][j] == num and j != pos[1]:
            return False
        
    if num in used_nums[get_sector(pos[0], pos[1])]:
        return False
    return True

def get_sector(row, col):
    if row < 3 and col < 3:
        sector = 0
    elif row < 3 and col < 6 and col > 2:
        sector = 1
    elif row < 3 and col < 9 and col > 5:
        sector = 2
    elif row < 6 and row > 2 and col < 3:
        sector = 3
    elif row < 6 and row > 2 and col < 6 and col > 2:
        sector = 4
    elif row < 6 and row > 2 and col < 9 and col > 5:
        sector = 5
    elif row < 9 and row > 5 and col < 3:
        sector = 6
    elif row < 9 and row > 5 and col < 6 and col > 2:
        sector = 7
    elif row < 9 and row > 5 and col < 9 and col > 5:
        sector = 8
    return sector

def solve(board):
    #board = [[0 for row in range(9)] for column in range(9)]
    find = find_empty(board)
    if not find:
        return True
    else:
        row, col = find

    for i in range(1, 10):
        if valid(board, (row, col), i):
            board[row][col] = i
            #print(i)
            used_nums[get_sector(row, col)].append(i)
            #print(used_nums)
            if solve(board):
                return True
            board[row][col] = 0
            used_nums[get_sector(row, col)].pop()
    return False

def find_empty(board):
    for i in range(81):
        row = i // 9
        col = i % 9
        if board[row][col] == 0:
            return row, col
    return False

used_nums = [[] for i in range(9)]
board = [[0 for row in range(9)] for column in range(9)]
if solve(board):
    print(board)
    for row in board:
            print("\t".join(str(cell) for cell in row))
            print("")