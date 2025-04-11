  const {setCurrentPage currentPage, totalPages, loading, category } = useCategory();
   <div className="flex justify-center space-x-2">
                      <Link href={`/dashboard/category/${datcategoryData._id}`}>
                        <Button
                          onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={currentPage === 1}
                          variant="outline"
                          size="sm"
                          className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                        >
                          Edit
                        </Button>
                      </Link>
                      <Button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                      >
                        Delete
                      </Button>
                    </div>
 