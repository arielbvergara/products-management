using Microsoft.AspNetCore.Mvc;
using products.core.Features.Products;
using products.models;

namespace products.api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly ProductsLogic _productsLogic;

    public ProductsController(ProductsLogic productsLogic)
    {
        _productsLogic = productsLogic;
    }

    [HttpGet]
    [Route("")]
    public async Task<ICollection<ProductModel>> GetAllProducts() => await _productsLogic.GetAllProducts();

    [HttpGet]
    [Route("/{code}")]
    public async Task<ProductModel> Get(string code) => await _productsLogic.GetByCode(code);

    [HttpPost]
    [Route("/{code}")]
    public async Task<ProductModel> Update(string code, [FromBody] ProductModel productModel) => await _productsLogic.UpdateProduct(code, productModel);
}