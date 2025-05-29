
import React, { useState } from "react";

export default function SdkEmbedGuide() {
  const [product, setProduct] = useState("AI Pro");
  const [price, setPrice] = useState("100");
  const [currency, setCurrency] = useState("USD");

  const iframeCode = `<iframe src="https://yourdomain.com/checkout.html?product=${encodeURIComponent(
    product
  )}&price=${price}&currency=${currency}" width="100%" height="720" frameborder="0"></iframe>`;

  const npmCode = `import CheckoutWidget from '@yourorg/checkout-widget';

<CheckoutWidget config={{
  product: '${product}',
  price: ${price},
  currency: '${currency}',
  taxRate: 0.05,
  onSuccess: (data) => console.log('付款成功', data)
}} />`;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">嵌入碼產生器</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">商品名稱</label>
          <input value={product} onChange={(e) => setProduct(e.target.value)} className="w-full border rounded px-2 py-1" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">價格</label>
          <input value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border rounded px-2 py-1" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">幣別</label>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full border rounded px-2 py-1">
            <option>USD</option>
            <option>TWD</option>
            <option>KRW</option>
          </select>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold">iframe 嵌入碼</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm whitespace-pre-wrap">{iframeCode}</pre>
      </div>

      <div>
        <h2 className="text-lg font-semibold">NPM 嵌入語法</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm whitespace-pre-wrap">{npmCode}</pre>
      </div>
    </div>
  );
}
