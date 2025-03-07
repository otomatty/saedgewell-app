import type { Metadata } from "next";
import { EstimateForm } from "./_components/EstimateForm";

export const metadata: Metadata = {
	title: "見積もり | Services",
	description: "プロジェクトの見積もりをご確認いただけます。",
};

export default function EstimatePage() {
	return (
		<main>
			<div className="container max-w-4xl py-20">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold mb-4">プロジェクトの見積もり</h1>
					<p className="text-muted-foreground">
						簡単な質問に答えるだけで、おおよその見積もり金額を算出できます。
						<br />
						要件や予算に応じて柔軟に対応いたしますので、まずはお気軽にご確認ください。
					</p>
				</div>
				<EstimateForm />
			</div>
		</main>
	);
}
