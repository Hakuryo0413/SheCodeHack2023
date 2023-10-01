from pymongo import MongoClient
import pymongo

# Thay thế các thông tin sau bằng thông tin của MongoDB Atlas của bạn
db_username = "shecode2023"
db_password = "shecode2023"


client = pymongo.MongoClient(f"mongodb+srv://shecode2023:shecode2023@cluster0.rg4qowa.mongodb.net/?retryWrites=true&w=majority")

db = client.Schema  # Thay thế "your_database_name" bằng tên cơ sở dữ liệu bạn muốn sử dụng
collection = db.users  # Thay thế "your_collection_name" bằng tên bảng bạn muốn truy vấn
# Lấy tất cả các tài liệu trong bảng
# export in all.json
 
all_documents = collection.find()
# print(all_documents)
# print(type(all_documents))

# Open the file in write mode ('w')
with open(file_path, "w", encoding="utf-8") as file:
    for document in all_documents:
        # Convert the document to a string and write it to the file
        file.write(str(document) + "\n")