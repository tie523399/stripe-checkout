
import './i18n';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './index.css';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import emailjs from '@emailjs/browser';

const schema = yup.object({
  email: yup.string().email('Email 格式錯誤').required('必填欄位'),
  cardNumber: yup.string().matches(/^[0-9]{16}$/, '請輸入 16 位數字').required(),
  expiry: yup.string().matches(/^(0[1-9]|1[0-2])\/\d{2}$/, '格式 MM/YY').required(),
  cvc: yup.string().matches(/^\d{3,4}$/, '3~4 位數字').required(),
  name: yup.string().required('請輸入姓名'),
}).required();

export default function App({ config = {} }) {
  const {
    product = 'ChatGPT Pro Subscription',
    price = 200,
    taxRate = 0.05,
    currency = 'USD',
    onSuccess = () => {}
  } = config;
  const { t, i18n } = useTranslation();
  const changeLang = (lng) => i18n.changeLanguage(lng);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const docRef = await addDoc(collection(db, 'receipts'), {
        ...data,
        createdAt: serverTimestamp()
      });
      await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', data, 'YOUR_PUBLIC_KEY');
      alert('收據已送出與寄出 Email 通知');
      onSuccess(data);
      reset();
    } catch (err) {
      alert('提交失敗: ' + err.message);
    }
  };
    alert('表單驗證成功，資料將進行處理\n' + JSON.stringify(data, null, 2));
    onSuccess(data);
      reset();
  };

  return (
    <div className="container">
      <div style={{ marginBottom: "1rem" }}>
        <select onChange={(e) => changeLang(e.target.value)}>
          <option value="zh">中文</option>
          <option value="en">English</option>
          <option value="ko">한국어</option>
        </select>
      </div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label>{t("email")}</label>
        <input {...register("email")} />
        <p className="error">{errors.email?.message}</p>

        <label>{t("card")}</label>
        <input {...register("cardNumber")} placeholder="1234123412341234" />
        <p className="error">{errors.cardNumber?.message}</p>

        <div className="row">
          <div style={{ flex: 1 }}>
            <label>{t("expiry")}</label>
            <input {...register("expiry")} placeholder="MM/YY" />
            <p className="error">{errors.expiry?.message}</p>
          </div>
          <div style={{ flex: 1 }}>
            <label>{t("cvc")}</label>
            <input {...register("cvc")} placeholder="CVC" />
            <p className="error">{errors.cvc?.message}</p>
          </div>
        </div>

        <label>{t("name")}</label>
        <input {...register("name")} />
        <p className="error">{errors.name?.message}</p>

        <button type="submit">{t("submit")}</button>
      </form>
    </div>
  );
}
