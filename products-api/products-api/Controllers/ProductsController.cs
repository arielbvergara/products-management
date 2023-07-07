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
    public async Task<ICollection<ProductModel>> GetAllProducts() => await _productsLogic.GetAllProducts();

    [HttpGet]
    [Route("/{code}")]
    public async Task<ProductModel> GetProduct(string code) => await _productsLogic.GetByCode(code);

    [HttpPatch]
    [Route("/{code}")]
    public async Task<ProductModel> UpdateProduct(string code, [FromBody] ProductModel productModel) => await _productsLogic.UpdateProduct(code, productModel);

    [HttpPost]
    public async Task<ProductModel> CreateProduct([FromBody] ProductModel productModel) => await _productsLogic.AddProduct(productModel);

    [HttpDelete]
    [Route("/{code}")]
    public async Task DeleteProduct(string code) => await _productsLogic.DeleteProduct(code);
}