


export default function Footer () {
  return (
      <footer className="w-full bg-black text-white mt-12">
        <div className="max-w-7xl mx-auto px-6 py-10 grid-cols-1 md:grid-cols-3 gap-8">
          
        {/*  회사 정보 (이후에 내용 더 추가 */}
          <div>
            <h3 className="text-lg font-semibold mb-3">회사 정보</h3>
            <p className="text-sm text-gray-400">
              © 2025 SAYREN Inc. All rights reserved.
            </p>
          </div>
        {/*  고객 센터 */}
          <div>
            <h3 className="text-lg font-semibold ">고객센터</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gray-500 transition">FAQ</a></li>
              <li><a href="#" className="hover:text-gray-500 transition">이용약관</a></li>
              <li><a href="#" className="hover:text-gray-500 transition">개인정보 처리방침</a></li>
            </ul>
          </div>

        </div>



      </footer>

  )
}