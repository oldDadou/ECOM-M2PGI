package fr.ujf.m2pgi.database.Service;

import fr.ujf.m2pgi.database.DTO.PhotoContextBigDTO;
import fr.ujf.m2pgi.database.DTO.PhotoContextSmallDTO;
import fr.ujf.m2pgi.database.DTO.PhotoDTO;
import fr.ujf.m2pgi.database.DTO.SignalDTO;
import fr.ujf.m2pgi.database.DTO.WishListPhotoDTO;
import fr.ujf.m2pgi.database.DTO.UpdatePhotoDTO;

import javax.ejb.Local;
import java.io.*;
import java.util.List;

/**
 * Created by FAURE Adrien on 03/11/15.
 */
@Local
public interface IPhotoService {

    PhotoDTO deletePhoto(Long id);

    PhotoDTO getPhotoById(Long id);
    
    PhotoContextBigDTO getPhotoById(Long photoID, Long memberID);

    PhotoDTO createPhoto(PhotoDTO photo);

    PhotoDTO updatePhoto(UpdatePhotoDTO photo);

    List<PhotoDTO> getAllPhotos();
    
    List<PhotoContextSmallDTO> getAllPhotosContext(Long memberID);

    List<PhotoDTO> getTop10Photos();
    
    List<PhotoDTO> getPhotosSortByPrice(boolean ascending);

    List<PhotoDTO> getPhotosSortByViews(boolean ascending);

    List<PhotoDTO> getPhotosSortByLikes(boolean ascending);

    List<PhotoDTO> getPhotosSortByDate(boolean ascending);

    List<PhotoDTO> getUserPhotos(Long id);

    List<PhotoDTO> getUserPhotos(String login);

    List<PhotoDTO> getUserWishedPhotos(String login);
    
    List<WishListPhotoDTO> getUserWishedPhotos(Long id);

    void saveFile(InputStream uploadedInputStream, String serverLocation);

    Long getPhotoCount();

    List<PhotoDTO> getAllAvailablePhotos();

    void viewPhoto(Long photoID, Long memberID);

    void likePhoto(Long photoID, Long memberID);

    void unlikePhoto(Long photoID, Long memberID);

    void addPhotoToWishList(Long photoID, Long memberID);

    void removePhotoFromWishList(Long photoID, Long memberID);
    
    SignalDTO signalPhoto(SignalDTO signalDTO);
}
