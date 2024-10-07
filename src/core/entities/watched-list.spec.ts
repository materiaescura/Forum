import { WatchedList } from './watched-list'

class NumberWatchedList extends WatchedList<number> {
  compareItems(a: number, b: number): boolean {
    return a === b
  }
}

describe('watched list', () => {
  it('should be able to create a watched list with initial items', () => {
    const numberWatchedList = new NumberWatchedList([1, 2, 3])
    expect(numberWatchedList.currentItems).toEqual([1, 2, 3])
  })

  it('should be able to add new items to the list', () => {
    const numberWatchedList = new NumberWatchedList([1, 2, 3])
    const expectNumberWatchedList = [1, 2, 3, 4]
    numberWatchedList.add(4)
    expect(numberWatchedList.currentItems).toEqual(expectNumberWatchedList)
  })

  it('should be able to remove items to the list', () => {
    const numberWatchedList = new NumberWatchedList([1, 2, 3])
    const expectNumberWatchedList = [1, 2]
    numberWatchedList.remove(3)
    expect(numberWatchedList.currentItems).toEqual(expectNumberWatchedList)
  })

  it('should be able to update items to the list', () => {
    const numberWatchedList = new NumberWatchedList([1, 2, 3])
    const expectNumberWatchedList = [3, 4]
    numberWatchedList.update(expectNumberWatchedList)
    expect(numberWatchedList.currentItems).toEqual(expectNumberWatchedList)
  })

  it('should be able to add and remove items to the list', () => {
    const numberWatchedList = new NumberWatchedList([1, 2, 3])
    const expectNumberWatchedList = [1, 4]
    numberWatchedList.remove(2)
    numberWatchedList.remove(3)
    numberWatchedList.add(4)
    expect(numberWatchedList.currentItems).toEqual(expectNumberWatchedList)
  })
})
