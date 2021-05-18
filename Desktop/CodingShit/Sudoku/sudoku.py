import random
class sudoku_board:
    def __init__(self, dim_size):
        self.dim_size = dim_size
        #self.sector = self.set_sector()
        #self.board = [['-' for row in range(self.dim_size)] for col in range(self.dim_size)]
        self.board = self.set_board()
        self.num_sectors = self.get_num_sectors()
        self.used_nums_in_sector = [[] for sector in range(self.num_sectors)]

    def __str__(self):
        big_string = ''
        for row in self.board:
            big_string += str("\t".join(str(cell) for cell in row))
            big_string += "\n"
        return big_string

    def get_num_sectors(self):
        return (self.dim_size // 3) ** 2

    def set_board(self):
        board = [['-' for row in range(self.dim_size)] for col in range(self.dim_size)]
        print(board)
        #self.used_nums_in_sector = [[] for sector in self.board]
        #sector = top_left
        j = 0
        sector_count = 1
            
            for i in range(self.dim_size):
                       
                randnum = random.randint(1, 9)

                while self.check_rows(j, board, randnum) == False or self.check_columns(i, board, randnum) == False:
                    randnum = random.randint(1, 9)
                    #print(randnum)
                    #board[i][j] = randnum
                    #top_left.append(randnum)    
                board[j][i] = randnum
                #print(board[i][j])
                #if i < 3 and j < 3:
                #self.used_nums_in_sector[sector_count].append(randnum)
                #elif i < 6 and j < 3:
                    #mid_left.append(randnum)
                #print(self.used_nums_in_sector[sector_count])
                #print(j)
            j += 1
        return board    


    def check_columns(self, row, board_to_check, num_to_check_for):
        #print(row, num_to_check_for)
        for i in range(self.dim_size):
            if board_to_check[row][i] == num_to_check_for:
                return False
        return True

    def check_rows(self, col, board_to_check, num_to_check_for):
        for i in range(self.dim_size):
            if board_to_check[i][col] == num_to_check_for:
                return False
        return True
        



test = sudoku_board(9)
print(test)
