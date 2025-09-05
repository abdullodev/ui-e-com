import React, { type Dispatch, type SetStateAction } from "react";
import type { IPromoCode } from "../basket";

interface Props {
  appliedPromo: IPromoCode | null;
  promoCode: string;
  setPromoCode: Dispatch<SetStateAction<string>>;
  setAppliedPromo: Dispatch<SetStateAction<IPromoCode | null>>;
}
const Promocode = ({
  promoCode,
  setPromoCode,
  setAppliedPromo,
  appliedPromo,
}: Props) => {
  const applyPromoCode = (): void => {
    if (promoCode.toLowerCase() === "save10") {
      setAppliedPromo({ code: "SAVE10", discount: 0.1, label: "10% off" });
      setPromoCode("");
    } else {
      alert("Invalid promo code");
    }
  };

  const handlePromoInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPromoCode(e.target.value);
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm dark:shadow-gray-900/50 p-6 mt-6 transition-colors duration-200">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Promo Code
      </h3>
      {appliedPromo ? (
        <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg p-4">
          <div className="flex items-center">
            <div className="text-green-600 dark:text-green-400 font-semibold">
              {appliedPromo.code}
            </div>
            <div className="text-green-600 dark:text-green-400 ml-2">
              ({appliedPromo.label})
            </div>
          </div>
          <button
            onClick={() => setAppliedPromo(null)}
            className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
          >
            Remove
          </button>
        </div>
      ) : (
        <div className="flex space-x-3">
          <input
            type="text"
            value={promoCode}
            onChange={handlePromoInputChange}
            placeholder="Enter promo code"
            className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />
          <button
            onClick={applyPromoCode}
            className="bg-gray-900 dark:bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-blue-700 transition-colors"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default Promocode;
