package fr.ujf.m2pgi.database.DTO;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAccessType;

/**
 *
 * @author AZOUZI Marwen ()
 *
 */
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class PhotoContextSmallDTO {

	private long photoID;

	private String name;

	private String webLocation;

	private float price;

	private Integer views;

	private Integer likes;

	private boolean wishlisted;

	private boolean inCart;

	private boolean liked;

	private boolean flagged;

	public PhotoContextSmallDTO(long photoID, String name, String webLocation, float price, Integer views, Integer likes,
			boolean wishlisted, boolean inCart, boolean liked, boolean flagged) {
		super();
		this.photoID = photoID;
		this.name = name;
		this.webLocation = webLocation;
		this.price = price;
		this.views = views;
		this.likes = likes;
		this.wishlisted = wishlisted;
		this.inCart = inCart;
		this.liked = liked;
		this.flagged = flagged;
	}

	public long getPhotoId() {
		return photoID;
	}

	public void setPhotoId(long photoID) {
		this.photoID = photoID;
	}

	public String getWebLocation() {
		return webLocation;
	}

	public void setWebLocation(String webLocation) {
		this.webLocation = webLocation;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public Integer getViews() {
		return views;
	}

	public void setViews(Integer views) {
		this.views = views;
	}

	public Integer getLikes() {
		return likes;
	}

	public void setLikes(Integer likes) {
		this.likes = likes;
	}

	public boolean isWishlisted() {
		return wishlisted;
	}

	public void setWishlisted(boolean wishlisted) {
		this.wishlisted = wishlisted;
	}

	public boolean isInCart() {
		return inCart;
	}

	public void setInCart(boolean inCart) {
		this.inCart = inCart;
	}

	public boolean isLiked() {
		return liked;
	}

	public void setLiked(boolean liked) {
		this.liked = liked;
	}

	public boolean isFlagged() {
		return flagged;
	}

	public void setFlagged(boolean flagged) {
		this.flagged = flagged;
	}
}