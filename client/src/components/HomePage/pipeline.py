# chuẩn bị model và tiền xử lý dữ liệu

import pandas as pd
import pandas as pd
from sklearn.preprocessing import LabelBinarizer
import pandas as pd
import numpy as np
from sklearn import preprocessing
# import warnings filter
import warnings
warnings.filterwarnings("ignore")
from sklearn.cluster import KMeans


class Pipeline:        
    encode_HaNoi = ['Hòa Bình', 'Sơn La', 'Điện Biên', 'Lai Châu', 'Lào Cai', 'Hà Giang', 'Cao Bằng', 'Bắc Kạn', 'Yên Bái', 'Lạng Sơn', 'Tuyên Quang', 'Thái Nguyên', 'Phú Thọ', 'Bắc Giang', 'Quảng Ninh', 'Vĩnh Phúc', 'Bắc Ninh', 'Hà Nam', 'Hải Dương', 'Hưng Yên', 'Nam Định', 'Ninh Bình', 'Thái Bình', 'Hà Nội', 'Hải Phòng']


    # Đà Nẵng: Thanh Hoá Nghệ An Hà Tĩnh Quảng Bình Quảng Trị Thừa Thiên-Huế Đà Nẵng Quảng Nam Quảng Ngãi Bình Định Phú Yên Khánh Hoà Ninh Thuận Bình Thuận Kon Tum Gia Lai Đắc Lắc Đắc Nông Lâm Đồng
    encode_DaNang = ['Thanh Hóa', 'Nghệ An', 'Hà Tĩnh', 'Quảng Bình', 'Quảng Trị', 'Thừa Thiên Huế', 'Đà Nẵng', 'Quảng Nam', 'Quảng Ngãi', 'Bình Định', 'Phú Yên', 'Khánh Hòa', 'Ninh Thuận', 'Bình Thuận', 'Kon Tum', 'Gia Lai', 'Đắk Lắk', 'Đắk Nông', 'Lâm Đồng']

    # Hồ Chí Minh: Bình Phước Tây Ninh Bình Dương Đồng Nai Bà Rịa-Vũng Tàu Long An Tiền Giang Bến Tre Trà Vinh Vĩnh Long Đồng Tháp An Giang Kiên Giang Cần Thơ Hậu Giang Sóc Trăng Bạc Liêu Cà Mau
    encode_HoChiMinh = ['Bình Phước', 'Tây Ninh', 'Bình Dương', 'Đồng Nai', 'Bà Rịa-Vũng Tàu', 'Long An', 'Tiền Giang', 'Bến Tre', 'Trà Vinh', 'Vĩnh Long', 'Đồng Tháp', 'An Giang', 'Kiên Giang', 'Cần Thơ', 'Hậu Giang', 'Sóc Trăng', 'Bạc Liêu', 'Cà Mau', 'Thành phố Hồ Chí Minh']
    encode_NuocNgoai = ['Nước ngoài']


    education_encoder = LabelBinarizer()
    role_encoder = LabelBinarizer()
    topic_encoder = LabelBinarizer()
    language_encoder = LabelBinarizer()
    min_max_scaler_1 = preprocessing.MinMaxScaler()
    min_max_scaler_2 = preprocessing.MinMaxScaler()

    # đoạn trên là khởi tạo giá trị trước, chúng sẽ được fit khi và chỉ khi is_train = True, nếu is_train=False, chúng chỉ sử dụng lại giá trị đã được fit trước đó
    
    
    
    
    
    
    def train(self, df):
        df_train = self.pipeline_preprocessing(df, is_train=True)
        self.model = KMeans(n_clusters=5, random_state=42).fit(df_train)
        
    def predict(self, df):
        df_test = self.pipeline_preprocessing(df, is_train=False)
        return self.model.predict(df_test)
        

    def pipeline_preprocessing(self, df, is_train=False):
        class_ss = ['Cử nhân', 'Đại học', 'Dưới đại học', 'Thạc sĩ', 'Tiến sĩ']
        ohe_df = pd.DataFrame(columns=class_ss)
        for i in range(len(df)):
            if df['Education'][i] == 'Cử nhân':
                # add 1 to HaNoi column
                ohe_df.loc[i] = [1, 0, 0, 0, 0]
            elif df['Education'][i] == 'Đại học':
                ohe_df.loc[i] = [0, 1, 0, 0, 0]
            elif df['Education'][i] == 'Dưới đại học':
                ohe_df.loc[i] = [0, 0, 1, 0, 0]
            elif df['Education'][i] == 'Thạc sĩ':
                ohe_df.loc[i] = [0, 0, 0, 1, 0]
            elif df['Education'][i] == 'Tiến sĩ':
                ohe_df.loc[i] = [0, 0, 0, 0, 1]
            else:
                print("Yêu cầu đúng định dạng ban đầu cho cột Education tại dòng: ", i)
                print(df.iloc[i])
        df = pd.concat([df, ohe_df], axis=1).drop(['Education'], axis=1)

        # with role, topic, location, joined, timetable, workplace, language column
        class_ss = ['Kỹ thuật viên', 'Quản lý', 'Manager', 'Marketing']
        ohe_df = pd.DataFrame(columns=class_ss)
        for i in range(len(df)):
            if df['Role'][i] == 'Kỹ thuật viên':
                ohe_df.loc[i] = [1, 0, 0, 0]
            elif df['Role'][i] == 'Quản lý':
                ohe_df.loc[i] = [0, 1, 0, 0]
            elif df['Role'][i] == 'Manager':
                ohe_df.loc[i] = [0, 0, 1, 0]
            elif df['Role'][i] == 'Marketing':
                ohe_df.loc[i] = [0, 0, 0, 1]
            else:
                print("Yêu cầu đúng định dạng ban đầu cho cột Role tại dòng: ", i)
                print(df.iloc[i])
        df = pd.concat([df, ohe_df], axis=1).drop(['Role'], axis=1)
        
        class_ss = ['Môi trường', 'Công nghệ', 'Kinh tế', 'Y tế']
        ohe_df = pd.DataFrame(columns=class_ss)
        for i in range(len(df)):
            if df['Topic'][i] == 'Môi trường':
                ohe_df.loc[i] = [1, 0, 0, 0]
            elif df['Topic'][i] == 'Công nghệ':
                ohe_df.loc[i] = [0, 1, 0, 0]
            elif df['Topic'][i] == 'Kinh tế':
                ohe_df.loc[i] = [0, 0, 1, 0]
            elif df['Topic'][i] == 'Y tế':
                ohe_df.loc[i] = [0, 0, 0, 1]
            else:
                print("Yêu cầu đúng định dạng ban đầu cho cột Topic tại dòng: ", i)
                print(df.iloc[i])
        df = pd.concat([df, ohe_df], axis=1).drop(['Topic'], axis=1)

        # jobs_encoder = LabelBinarizer()
        # encode location as HaNoi, DaNang, HoChiMinh, NuocNgoai
        # jobs_encoder.fit(df['Location'])
        class_ss = ['HaNoi', 'DaNang', 'HoChiMinh', 'NuocNgoai']
        ohe_df = pd.DataFrame(columns=class_ss)
        for i in range(len(df)):
            if df['Location'][i] in self.encode_HaNoi:
                # add 1 to HaNoi column
                ohe_df.loc[i] = [1, 0, 0, 0]
            elif df['Location'][i] in  self.encode_DaNang:
                ohe_df.loc[i] = [0, 1, 0, 0]
            elif df['Location'][i] in  self.encode_HoChiMinh:
                ohe_df.loc[i] = [0, 0, 1, 0]
            elif df['Location'][i] in  self.encode_NuocNgoai:
                ohe_df.loc[i] = [0, 0, 0, 1]
            else:
                print("Yêu cầu đúng định dạng ban đầu cho cột Location tại dòng: ", i)
                print(df.iloc[i])
        df = pd.concat([df, ohe_df], axis=1).drop(['Location'], axis=1)
        
        
        for i in range(len(df)):
            if df['Joined'][i] == "Có":
                df['Joined'][i] = 1
            else:
                df['Joined'][i] = 0

        class_ss = ['Sang', 'Trua', 'Chieu', 'Toi']
        one_df = pd.DataFrame(columns=class_ss)
        for i in range(len(df)):
            if df['Timetable'][i] == 'Sáng':
                one_df.loc[i] = [1, 0, 0, 0]
            elif df['Timetable'][i] == 'Trưa':
                one_df.loc[i] = [0, 1, 0, 0]
            elif df['Timetable'][i] == 'Chiều':
                one_df.loc[i] = [0, 0, 1, 0]
            elif df['Timetable'][i] == 'Tối':
                one_df.loc[i] = [0, 0, 0, 1]
            elif df['Timetable'][i] == 'Cả ngày':
                one_df.loc[i] = [1, 1, 1, 1]
            else:
                print("Yêu cầu đúng định dạng ban đầu cho cột Timetable tại dòng: ", i)
                print(df.iloc[i])
        df = pd.concat([df, one_df], axis=1).drop(['Timetable'], axis=1)

        class_ss = ['Online', 'Offline']
        one_df = pd.DataFrame(columns=class_ss)
        for i in range(len(df)):
            if df['Workplace'][i] == 'Online':
                one_df.loc[i] = [1, 0]
            elif df['Workplace'][i] == 'Offline':
                one_df.loc[i] = [0, 1]
            elif df['Workplace'][i] == 'Cả hai':
                one_df.loc[i] = [1, 1]
            else:
                print("Yêu cầu đúng định dạng ban đầu cho cột Workplace tại dòng: ", i)
                print(df.iloc[i])
        df = pd.concat([df, one_df], axis=1).drop(['Workplace'], axis=1)

        class_ss = ['Anh', 'Nhật', 'Trung', 'Khác']
        one_df = pd.DataFrame(columns=class_ss)
        for i in range(len(df)):
            if df['Language'][i] == 'Anh':
                one_df.loc[i] = [1, 0, 0, 0]
            elif df['Language'][i] == 'Nhật':
                one_df.loc[i] = [0, 1, 0, 0]
            elif df['Language'][i] == 'Trung':
                one_df.loc[i] = [0, 0, 1, 0]
            elif df['Language'][i] == 'Khác':
                one_df.loc[i] = [0, 0, 0, 1]
            else:
                print("Yêu cầu đúng định dạng ban đầu cho cột Language tại dòng: ", i)
                print(df.iloc[i])
        df = pd.concat([df, one_df], axis=1).drop(['Language'], axis=1)
        
        #  gender if Nam -> 1, Nữ -> 0
        for i in range(len(df)):
            if df['Gender'][i] == "Nam":
                df['Gender'][i] = 1
            elif df['Gender'][i] == "Nữ":
                df['Gender'][i] = 0
            else:
                print("Yêu cầu đúng định dạng ban đầu cho cột Nam/Nữ tại dòng: ", i)
                print(df.iloc[i])
                
        if is_train:      
             self.min_max_scaler_1.fit(df[['Age']])
        x_scaled =  self.min_max_scaler_1.fit_transform(df[['Age']])
        df['Age'] = pd.DataFrame(x_scaled)
        
        if is_train:
             self.min_max_scaler_2.fit(df[['Experience']])
        x_scaled1 =  self.min_max_scaler_2.fit_transform(df[['Experience']])
        df['Experience'] = pd.DataFrame(x_scaled1)
        return df

   