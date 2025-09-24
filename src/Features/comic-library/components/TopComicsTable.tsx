import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface TopComic {
  rank: number
  title: string
  author: string
  floorPrice: string
  priceChange: number
  copies: number
  sales: number
  volume: string
}

interface TopComicsTableProps {
  comics: TopComic[]
}

export function TopComicsTable({ comics }: TopComicsTableProps) {
  const timePeriods = ['10m', '1h', '6h', '1d', '7d', '30d']
  
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-xl font-bold">Top Comics</h2>
        
        {/* Time Period Selector */}
        <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
          {timePeriods.map((period) => (
            <button
              key={period}
              className={`px-3 py-1 text-xs rounded ${
                period === '10m' 
                  ? 'bg-orange-500 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-700 hover:bg-gray-800">
              <TableHead className="text-gray-400 font-medium">Comic</TableHead>
              <TableHead className="text-gray-400 font-medium">Floor Price</TableHead>
              <TableHead className="text-gray-400 font-medium">Copies</TableHead>
              <TableHead className="text-gray-400 font-medium">Sales</TableHead>
              <TableHead className="text-gray-400 font-medium">24h Volume</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comics.map((comic) => (
              <TableRow 
                key={comic.rank} 
                className="border-gray-700 hover:bg-gray-800/50"
              >
                <TableCell className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">N</span>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{comic.title}</p>
                    <p className="text-gray-400 text-xs">{comic.author}</p>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">{comic.floorPrice}</span>
                    <span className={`text-xs ${
                      comic.priceChange > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {comic.priceChange > 0 ? '+' : ''}{comic.priceChange}%
                    </span>
                  </div>
                </TableCell>
                
                <TableCell className="text-gray-300">
                  {comic.copies.toLocaleString()} Copies
                </TableCell>
                
                <TableCell className="text-gray-300">
                  {comic.sales} Sales
                </TableCell>
                
                <TableCell className="text-white font-medium">
                  {comic.volume}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}