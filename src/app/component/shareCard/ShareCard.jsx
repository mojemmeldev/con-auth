import Image from "next/image";
import Link from "next/link";

const ShareCard = ({ product }) => {
  const {
    _id,
    name,
    slug,
    category,
    currentPrice,
    previousPrice,
    trend,
    trendPercent,
    image,
    stores = [],
  } = product;

  // Price difference
  const priceDifference = Math.abs(previousPrice - currentPrice);

  // Stores array অথবা number দুইটাই handle করবে
  const storeCount = Array.isArray(stores)
    ? stores.length
    : Number(stores) || 0;

  return (
    <div className="w-full max-w-[390px] rounded-[22px] border border-slate-200 bg-white p-7">

      {/* Product Image Area */}
      <div className="relative flex h-[240px] items-center justify-center rounded-[14px] bg-slate-100">

        {/* Price Save / Increase Badge */}
        {trend === "down" ? (
          <div className="absolute left-4 top-4 z-10 rounded-[9px] border border-emerald-200 bg-emerald-100 px-3 py-2 text-[16px] font-semibold text-emerald-700">
            Save ৳{priceDifference.toLocaleString()}
          </div>
        ) : (
          <div className="absolute left-4 top-4 z-10 rounded-[9px] border border-orange-200 bg-orange-50 px-3 py-2 text-[16px] font-semibold text-orange-600">
            +৳{priceDifference.toLocaleString()}
          </div>
        )}

        {/* Trend Badge */}
        <div
          className={`absolute right-4 top-4 z-10 rounded-[9px] border px-3 py-2 text-[16px] font-semibold ${
            trend === "down"
              ? "border-emerald-200 bg-emerald-50 text-emerald-600"
              : "border-red-200 bg-red-50 text-red-600"
          }`}
        >
          {trend === "down" ? "▼" : "▲"} {trendPercent}%
        </div>

        {/* Product Image */}
        <Image
          src={image}
          alt={name}
          width={210}
          height={210}
          className="h-[200px] w-[200px] object-contain"
        />
      </div>

      {/* Category */}
      <div className="mt-8">
        <span className="rounded-md bg-indigo-50 px-3 py-1 text-[16px] font-semibold uppercase text-indigo-600">
          {category}
        </span>
      </div>

      {/* Product Name */}
      <h2 className="mt-4 text-[21px] font-semibold leading-snug text-slate-800">
        {name}
      </h2>

      {/* Price */}
      <div className="mt-6 flex items-center gap-4">

        <span className="text-[31px] font-bold tracking-tight text-slate-950">
          ৳{currentPrice.toLocaleString()}
        </span>

        <span className="text-[17px] text-slate-400 line-through">
          ৳{previousPrice.toLocaleString()}
        </span>

      </div>

      {/* Divider */}
      <div className="my-5 border-t border-slate-200" />

      {/* Footer */}
      <div className="flex items-center justify-between">

        {/* Stores */}
        <div className="flex items-center gap-2 text-[17px] text-slate-500">
          <span>🏪</span>

          <span>
            {storeCount} {storeCount === 1 ? "store" : "stores"}
          </span>
        </div>

        {/* Details */}
        <Link
          href={`/product/${slug}`}
          className="text-[17px] font-semibold text-indigo-600 transition hover:text-indigo-800"
        >
          View Details →
        </Link>

      </div>

    </div>
  );
};

export default ShareCard;