"use client";
import {useEffect, useState} from "react";

export default function ProductTagFilter({productList, onTagSelect}) {
  const [tagOptions, setTagOptions] = useState([]); // 태그 묶음
  const [selectedTags, setSelectedTags] = useState([]);

  function tagList(productList) {
    const tagMap = {};

    productList.forEach((product) => {
      if (!product?.tags) return; // tags가 없으면 건너뜀

      product.tags.forEach((tag) => {
        const [tagName, tagValue] = tag.split("#");
        if (!tagMap[tagName]) tagMap[tagName] = new Set();
        tagMap[tagName].add(tagValue.trim());
      });
    });

    // 객체 배열 형태로 변환
    return Object.entries(tagMap).map(([key, values]) => ({
      [key]: Array.from(values),
    }));
  }

  useEffect(() => {
    if (productList?.length) {
      setTagOptions(tagList(productList));
    }
  }, [productList]);

  const handleCheckboxChange = (tagName, tagValue, checked) => {
    const tagFull = `${tagName}#${tagValue}`;
    setSelectedTags((prev) =>
      checked ? [...prev, tagFull] : prev.filter((t) => t !== tagFull)
    );
  };

  const handleApplyFilters = () => {
    onTagSelect?.(selectedTags);
  };


  return (
    <div className="mt-10 border-t pt-6 w-full">
      <h2 className="text-lg font-bold mb-4">상세 검색</h2>


      {tagOptions.map((group, idx) => {
        const [tagName, tagValues] = Object.entries(group)[0];
        return (
          <div key={idx} className="mb-4">
            <h3 className="font-semibold text-lg mb-2">{tagName}</h3>
            <div className="flex flex-wrap gap-4">
              {tagValues.map((val, i) => {
                const tagFull = `${tagName}#${val}`;
                return (
                  <label key={i} className="flex items-center gap-2 text-lg">
                    <input
                      type="checkbox"
                      name={tagName}
                      value={val}
                      checked={selectedTags.includes(tagFull)}
                      onChange={(e) =>
                        handleCheckboxChange(tagName, val, e.target.checked)
                      }
                      className="accent-neutral-900 w-4 h-4"
                    />
                    <span>{val}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleApplyFilters}
          className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
        >
          적용하기
        </button>
      </div>
    </div>
  );
}
