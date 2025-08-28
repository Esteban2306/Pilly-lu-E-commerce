export default function productIdPage({ params }: { params: { id: string } }) {

    return (
        <div>{params.id}</div>
    )
}