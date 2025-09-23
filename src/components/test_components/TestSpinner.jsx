import Button from "@/components/common/Button";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function TestSpinner() {
  return (
      <div className="flex justify-center">
        <Button disabled className="flex flex-col items-center gap-2 px-6 py-4">
          <LoadingSpinner size="sm" />
          처리 중...
        </Button>
        {/*풀스크린 주석*/}
        {/*<LoadingSpinner size="lg" fullscreen />*/}
      </div>
  );
}
