import { Controller,Get,Post,Put,Delete, Param, Query, Body, NotFoundException, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { CreateNinjaDto } from 'src/ninjas/dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';
import { UseGuards } from '@nestjs/common';

@Controller('ninjas')
export class NinjasController {
    constructor(private readonly ninjasService: NinjasService){}
    
    // GET/ ninjas?type=fast -->[]
    @Get()
    getNinjas(@Query('weapon') weapon:'stars'|'nunchuck'){
        // const service = new NinjasService;
        return this.ninjasService.getNinjas(weapon);
    }
    
    // GET / ninjas/:id --> {...}
    @Get(':id')
    getOneNinja(@Param('id', ParseIntPipe) id:number){
        try{
            return this.ninjasService.getNinja(id);
        }catch(err){  // this will throw a 404 response when ninja not found
            throw new NotFoundException();
        }
    }
    
    // post /ninjas
    @Post()
    @UseGuards(BeltGuard)
    createNinjas(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto){
        return this.ninjasService.createNinja(createNinjaDto);
    }

// PUT ninjas/:id ---> {.....}
@Put(':id')
updateNinja(@Param('id') id:String, @Body() updateNinjaDto:UpdateNinjaDto){
    return this.ninjasService.upadateNinja(+id, updateNinjaDto);
}

// DELETE /ninjas/:id
@Delete(':id')
removeNinjas(@Param('id') id:String){
    return this.ninjasService.removeNinja(+id);
}

}